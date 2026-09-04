import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import {
  addDeclaredCredential,
  addDeclaredEducation,
  addDeclaredExperience,
  addLink,
  addSkill,
  ownerCv,
  setVisibility,
  updateProfile,
} from "@/lib/store/memory";
import { nowIso } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  return NextResponse.json(ownerCv(session.profileId));
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const body = await req.json();
  try {
    if (body.addSkill) addSkill(session.profileId, String(body.addSkill));
    if (body.addLink) addLink(session.profileId, body.addLink.label, body.addLink.url);
    if (body.addExperience) {
      addDeclaredExperience(session.profileId, {
        title: body.addExperience.title,
        company: body.addExperience.company,
        startDate: nowIso(),
        endDate: null,
        description: "",
        isPublic: true,
      });
    }
    if (body.addEducation) {
      addDeclaredEducation(session.profileId, {
        school: body.addEducation.school,
        degree: body.addEducation.degree,
        field: body.addEducation.field,
        year: body.addEducation.year,
        isPublic: true,
      });
    }
    if (body.addCredential) {
      addDeclaredCredential(session.profileId, body.addCredential);
    }
    if (body.visibility) {
      setVisibility(
        session.profileId,
        body.visibility.kind,
        body.visibility.id,
        body.visibility.isPublic,
      );
    }
    updateProfile(session.profileId, {
      handle: body.handle,
      legalName: body.legalName,
      displayHeadline: body.displayHeadline,
      bio: body.bio,
      avatarUrl: body.avatarUrl,
      integrityLinkEnabled: body.integrityLinkEnabled,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error" },
      { status: 400 },
    );
  }
}
