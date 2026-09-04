import { NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { assertAdditiveSchema, relayAttestation } from "@/lib/eas/client";
import { issuersFor, issueOnchainCredential } from "@/lib/store/memory";
import { sha256Hex } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !hasRole(session, "issuer")) {
    return NextResponse.json({ error: "No eres emisor" }, { status: 403 });
  }
  const body = (await req.json()) as {
    issuerId: string;
    profileId: string;
    title: string;
    credentialType: "academic" | "employment" | "brand";
  };
  const mine = issuersFor(session.profileId).find((i) => i.id === body.issuerId);
  if (!mine) return NextResponse.json({ error: "Emisor no autorizado" }, { status: 403 });

  const schemaName =
    body.credentialType === "academic"
      ? "AcademicCredential"
      : body.credentialType === "employment"
        ? "EmploymentAttestation"
        : "BrandRepresentation";
  assertAdditiveSchema(schemaName);
  const documentHash = await sha256Hex(`${body.title}:${mine.id}:${body.profileId}`);
  const att = await relayAttestation({
    schemaName,
    recipient: body.profileId,
    documentHash,
  });
  issueOnchainCredential({
    profileId: body.profileId,
    issuerId: mine.id,
    issuerName: mine.name,
    title: body.title,
    credentialType: body.credentialType,
    documentHash,
    easUid: att.uid,
  });
  return NextResponse.json({
    message: `Atestación ${schemaName} emitida (${att.demo ? "relayer demo" : "Polygon"}). UID ${att.uid.slice(0, 18)}…`,
  });
}
