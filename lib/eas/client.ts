import { easExplorer, uid } from "@/lib/utils";
import { FORBIDDEN_EAS, schemaUidPlaceholder } from "@/lib/eas/schemas";

export type AttestationPreview = {
  uid: string;
  schema: string;
  revoked: boolean;
  expired: boolean;
  explorerUrl: string;
  demo: boolean;
};

export function assertAdditiveSchema(schemaName: string) {
  if (FORBIDDEN_EAS.some((f) => schemaName.toLowerCase().includes(f.toLowerCase()))) {
    throw new Error(
      "Prohibido: no se emiten atestaciones de antecedentes o delitos en la cadena.",
    );
  }
}

export function fakeAttestationUid(): string {
  return `0x${uid("eas").replace(/_/g, "")}${"0".repeat(40)}`.slice(0, 66);
}

export async function readAttestation(easUid: string): Promise<AttestationPreview> {
  if (easUid.startsWith("0xdemo") || easUid.includes("eas")) {
    return {
      uid: easUid,
      schema: schemaUidPlaceholder("AcademicCredential"),
      revoked: false,
      expired: false,
      explorerUrl: easExplorer(easUid),
      demo: true,
    };
  }

  const rpc = process.env.NEXT_PUBLIC_RPC_URL;
  const eas = process.env.NEXT_PUBLIC_EAS_CONTRACT;
  if (!rpc || !eas) {
    return {
      uid: easUid,
      schema: "unknown",
      revoked: false,
      expired: false,
      explorerUrl: easExplorer(easUid),
      demo: true,
    };
  }

  try {
    const { EAS } = await import("@ethereum-attestation-service/eas-sdk");
    const { ethers } = await import("ethers");
    const provider = new ethers.JsonRpcProvider(rpc);
    const client = new EAS(eas);
    client.connect(provider);
    const att = await client.getAttestation(easUid);
    const zero = BigInt(0);
    const expired =
      att.expirationTime !== zero && att.expirationTime < BigInt(Math.floor(Date.now() / 1000));
    return {
      uid: easUid,
      schema: att.schema,
      revoked: Boolean(att.revocationTime && att.revocationTime !== zero),
      expired,
      explorerUrl: easExplorer(easUid),
      demo: false,
    };
  } catch {
    return {
      uid: easUid,
      schema: "unavailable",
      revoked: false,
      expired: false,
      explorerUrl: easExplorer(easUid),
      demo: true,
    };
  }
}

export async function relayAttestation(input: {
  schemaName: string;
  recipient: string;
  documentHash: string;
}): Promise<{ uid: string; demo: boolean }> {
  assertAdditiveSchema(input.schemaName);
  const key = process.env.PLATFORM_WALLET_PRIVATE_KEY;
  if (!key) {
    return { uid: fakeAttestationUid(), demo: true };
  }
  return { uid: fakeAttestationUid(), demo: true };
}
