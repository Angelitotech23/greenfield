import {
  seedCheckins,
  seedCredentials,
  seedEducation,
  seedEvents,
  seedExperience,
  seedGrants,
  seedIssuerMembers,
  seedIssuers,
  seedLinks,
  seedLogs,
  seedProfiles,
  seedRoles,
  seedSkills,
  seedUniqueness,
  seedVault,
  seedWeb2,
} from "@/lib/store/demo-seed";
import type {
  Checkin,
  Credential,
  Education,
  EventRecord,
  Experience,
  IntegrityGrant,
  IntegrityLog,
  IntegrityVault,
  Issuer,
  IssuerMember,
  Profile,
  PublicCv,
  SessionUser,
  Skill,
  SocialLink,
  UserRole,
  Web2Verification,
} from "@/lib/types";
import { isReservedHandle, normalizeHandle, nowIso, uid } from "@/lib/utils";

type State = {
  profiles: Profile[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  links: SocialLink[];
  credentials: Credential[];
  issuers: Issuer[];
  issuerMembers: IssuerMember[];
  vault: IntegrityVault[];
  grants: IntegrityGrant[];
  logs: IntegrityLog[];
  web2: Web2Verification[];
  events: EventRecord[];
  checkins: Checkin[];
  uniqueness: { hash: string; profileId: string }[];
  roles: Record<string, UserRole[]>;
};

declare global {
  var __pasaporteStore: State | undefined;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function createState(): State {
  return {
    profiles: clone(seedProfiles),
    experience: clone(seedExperience),
    education: clone(seedEducation),
    skills: clone(seedSkills),
    links: clone(seedLinks),
    credentials: clone(seedCredentials),
    issuers: clone(seedIssuers),
    issuerMembers: clone(seedIssuerMembers),
    vault: clone(seedVault),
    grants: clone(seedGrants),
    logs: clone(seedLogs),
    web2: clone(seedWeb2),
    events: clone(seedEvents),
    checkins: clone(seedCheckins),
    uniqueness: clone(seedUniqueness),
    roles: clone(seedRoles),
  };
}

export function db(): State {
  if (!globalThis.__pasaporteStore) {
    globalThis.__pasaporteStore = createState();
  }
  return globalThis.__pasaporteStore;
}

export function getProfileByHandle(handle: string): Profile | undefined {
  return db().profiles.find((p) => p.handle === handle.toLowerCase());
}

export function getProfileById(id: string): Profile | undefined {
  return db().profiles.find((p) => p.id === id);
}

export function getProfileByWallet(wallet: string): Profile | undefined {
  return db().profiles.find(
    (p) => p.walletAddress.toLowerCase() === wallet.toLowerCase(),
  );
}

export function getProfileByEmail(email: string): Profile | undefined {
  return db().profiles.find(
    (p) => p.email?.toLowerCase() === email.toLowerCase(),
  );
}

export function publicCv(handle: string): PublicCv | null {
  const profile = getProfileByHandle(handle);
  if (!profile) return null;
  return {
    profile,
    experience: db().experience.filter(
      (x) => x.profileId === profile.id && x.isPublic,
    ),
    education: db().education.filter(
      (x) => x.profileId === profile.id && x.isPublic,
    ),
    skills: db().skills.filter((x) => x.profileId === profile.id && x.isPublic),
    links: db().links.filter((x) => x.profileId === profile.id && x.isPublic),
    credentials: db().credentials.filter(
      (x) => x.profileId === profile.id && x.isPublic && !x.revokedAt,
    ),
  };
}

export function ownerCv(profileId: string): PublicCv | null {
  const profile = getProfileById(profileId);
  if (!profile) return null;
  return {
    profile,
    experience: db().experience.filter((x) => x.profileId === profileId),
    education: db().education.filter((x) => x.profileId === profileId),
    skills: db().skills.filter((x) => x.profileId === profileId),
    links: db().links.filter((x) => x.profileId === profileId),
    credentials: db().credentials.filter((x) => x.profileId === profileId),
  };
}

export function searchProfiles(q: string): Profile[] {
  const query = q.trim().toLowerCase();
  const people = db().profiles.filter(
    (p) => !["emisor-umsa", "validador-oficial", "organizador-lab"].includes(p.handle),
  );
  if (!query) return people;
  return people.filter((p) => {
    const skills = db()
      .skills.filter((s) => s.profileId === p.id)
      .map((s) => s.name.toLowerCase())
      .join(" ");
    const issuers = db()
      .credentials.filter((c) => c.profileId === p.id)
      .map((c) => c.issuerName.toLowerCase())
      .join(" ");
    return (
      p.handle.includes(query) ||
      p.legalName.toLowerCase().includes(query) ||
      p.displayHeadline.toLowerCase().includes(query) ||
      p.bio.toLowerCase().includes(query) ||
      skills.includes(query) ||
      issuers.includes(query)
    );
  });
}

export function upsertSessionUser(input: {
  email?: string;
  walletAddress?: string;
  name?: string;
}): SessionUser {
  const wallet =
    input.walletAddress ??
    `0xDEMO${uid("w").slice(0, 34).toUpperCase().padEnd(34, "0")}`;
  let profile =
    (input.email ? getProfileByEmail(input.email) : undefined) ??
    getProfileByWallet(wallet);

  if (!profile) {
    const base = normalizeHandle(input.name || input.email?.split("@")[0] || "nuevo");
    let handle = base || "nuevo";
    let i = 0;
    while (getProfileByHandle(handle) || isReservedHandle(handle)) {
      i += 1;
      handle = `${base}${i}`;
    }
    profile = {
      id: uid("p"),
      walletAddress: wallet,
      handle,
      legalName: input.name || handle,
      legalNameLocked: false,
      displayHeadline: "Profesional",
      bio: "",
      avatarUrl: "",
      kycStatus: "none",
      sbtTokenId: null,
      integrityLinkEnabled: false,
      createdAt: nowIso(),
      email: input.email,
    };
    db().profiles.push(profile);
    db().roles[profile.id] = ["user"];
  }

  return {
    profileId: profile.id,
    walletAddress: profile.walletAddress,
    email: profile.email,
    roles: db().roles[profile.id] ?? ["user"],
  };
}

export function updateProfile(
  profileId: string,
  patch: Partial<
    Pick<
      Profile,
      | "displayHeadline"
      | "bio"
      | "avatarUrl"
      | "handle"
      | "integrityLinkEnabled"
      | "legalName"
    >
  >,
): Profile {
  const profile = getProfileById(profileId);
  if (!profile) throw new Error("Perfil no encontrado");
  if (patch.handle && patch.handle !== profile.handle) {
    const handle = normalizeHandle(patch.handle);
    if (isReservedHandle(handle) || getProfileByHandle(handle)) {
      throw new Error("Ese identificador no está disponible");
    }
    profile.handle = handle;
  }
  if (patch.legalName !== undefined) {
    if (profile.legalNameLocked) {
      throw new Error("El nombre legal está bloqueado tras el KYC");
    }
    profile.legalName = patch.legalName;
  }
  if (patch.displayHeadline !== undefined) profile.displayHeadline = patch.displayHeadline;
  if (patch.bio !== undefined) profile.bio = patch.bio;
  if (patch.avatarUrl !== undefined) profile.avatarUrl = patch.avatarUrl;
  if (patch.integrityLinkEnabled !== undefined) {
    profile.integrityLinkEnabled = patch.integrityLinkEnabled;
  }
  return profile;
}

export function setVisibility(
  profileId: string,
  kind: "experience" | "education" | "skill" | "link" | "credential",
  id: string,
  isPublic: boolean,
) {
  const tables = {
    experience: db().experience,
    education: db().education,
    skill: db().skills,
    link: db().links,
    credential: db().credentials,
  };
  const row = tables[kind].find((x) => x.id === id && x.profileId === profileId);
  if (row) row.isPublic = isPublic;
}

export function addDeclaredExperience(
  profileId: string,
  input: Omit<Experience, "id" | "profileId" | "trustLevel" | "easUid" | "locked">,
) {
  const row: Experience = {
    ...input,
    id: uid("exp"),
    profileId,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  };
  db().experience.push(row);
  return row;
}

export function addDeclaredEducation(
  profileId: string,
  input: Omit<Education, "id" | "profileId" | "trustLevel" | "easUid" | "locked">,
) {
  const row: Education = {
    ...input,
    id: uid("edu"),
    profileId,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  };
  db().education.push(row);
  return row;
}

export function addSkill(profileId: string, name: string) {
  const row: Skill = { id: uid("sk"), profileId, name, isPublic: true };
  db().skills.push(row);
  return row;
}

export function addLink(profileId: string, label: string, url: string) {
  const row: SocialLink = { id: uid("ln"), profileId, label, url, isPublic: true };
  db().links.push(row);
  return row;
}

export function addDeclaredCredential(
  profileId: string,
  input: Pick<Credential, "title" | "issuerName" | "credentialType">,
) {
  const row: Credential = {
    id: uid("cred"),
    profileId,
    title: input.title,
    issuerName: input.issuerName,
    issuerId: null,
    credentialType: input.credentialType,
    documentHash: null,
    easUid: null,
    trustLevel: "declared",
    issuedAt: nowIso(),
    isPublic: true,
    revokedAt: null,
  };
  db().credentials.push(row);
  return row;
}

export function issueOnchainCredential(input: {
  profileId: string;
  issuerId: string;
  issuerName: string;
  title: string;
  credentialType: Credential["credentialType"];
  documentHash: string;
  easUid: string;
  targetExperienceId?: string;
  targetEducationId?: string;
}) {
  const row: Credential = {
    id: uid("cred"),
    profileId: input.profileId,
    title: input.title,
    issuerName: input.issuerName,
    issuerId: input.issuerId,
    credentialType: input.credentialType,
    documentHash: input.documentHash,
    easUid: input.easUid,
    trustLevel: "onchain",
    issuedAt: nowIso(),
    isPublic: true,
    revokedAt: null,
  };
  db().credentials.push(row);
  if (input.targetExperienceId) {
    const exp = db().experience.find((x) => x.id === input.targetExperienceId);
    if (exp) {
      exp.trustLevel = "onchain";
      exp.easUid = input.easUid;
      exp.locked = true;
    }
  }
  if (input.targetEducationId) {
    const edu = db().education.find((x) => x.id === input.targetEducationId);
    if (edu) {
      edu.trustLevel = "onchain";
      edu.easUid = input.easUid;
      edu.locked = true;
    }
  }
  return row;
}

export function revokeCredential(issuerId: string, credentialId: string) {
  const cred = db().credentials.find((c) => c.id === credentialId);
  if (!cred || cred.issuerId !== issuerId) {
    throw new Error("No puedes revocar esta credencial");
  }
  cred.revokedAt = nowIso();
  return cred;
}

export function issuersFor(profileId: string): Issuer[] {
  const ids = db()
    .issuerMembers.filter((m) => m.profileId === profileId)
    .map((m) => m.issuerId);
  return db().issuers.filter((i) => ids.includes(i.id));
}

export function applyKyc(input: {
  profileId: string;
  legalName: string;
  uniquenessHash: string;
}): { ok: true; sbtTokenId: string } | { ok: false; reason: "duplicate" } {
  const existing = db().uniqueness.find((u) => u.hash === input.uniquenessHash);
  if (existing && existing.profileId !== input.profileId) {
    const profile = getProfileById(input.profileId);
    if (profile) profile.kycStatus = "duplicate";
    return { ok: false, reason: "duplicate" };
  }
  const profile = getProfileById(input.profileId);
  if (!profile) throw new Error("Perfil no encontrado");
  if (!existing) {
    db().uniqueness.push({ hash: input.uniquenessHash, profileId: input.profileId });
  }
  profile.legalName = input.legalName;
  profile.legalNameLocked = true;
  profile.kycStatus = "approved";
  if (!profile.sbtTokenId) {
    profile.sbtTokenId = String(db().profiles.filter((p) => p.sbtTokenId).length + 1);
  }
  return { ok: true, sbtTokenId: profile.sbtTokenId };
}

export function addWeb2Credential(input: Web2Verification) {
  db().web2.push(input);
  db().credentials.push({
    id: uid("cred"),
    profileId: input.profileId,
    title: input.title,
    issuerName:
      input.provider === "datacamp"
        ? "DataCamp"
        : input.provider === "microsoft"
          ? "Microsoft Learn"
          : "Coursera",
    issuerId: null,
    credentialType: "web2",
    documentHash: null,
    easUid: null,
    trustLevel: "web2",
    issuedAt: input.verifiedAt,
    isPublic: true,
    revokedAt: null,
    externalId: input.externalId,
    provider: input.provider,
  });
}

export function upsertVault(input: Omit<IntegrityVault, "id" | "createdAt"> & { id?: string }) {
  const current = db().vault.find((v) => v.profileId === input.profileId);
  if (current) {
    current.status = input.status;
    current.officialSource = input.officialSource;
    current.summary = input.summary;
    current.expiresAt = input.expiresAt;
    return current;
  }
  const row: IntegrityVault = {
    id: uid("vault"),
    profileId: input.profileId,
    status: input.status,
    officialSource: input.officialSource,
    summary: input.summary,
    expiresAt: input.expiresAt,
    createdAt: nowIso(),
  };
  db().vault.push(row);
  return row;
}

export function deleteVault(profileId: string) {
  const s = db();
  s.vault = s.vault.filter((v) => v.profileId !== profileId);
  const grantIds = s.grants.filter((g) => g.profileId === profileId).map((g) => g.id);
  s.grants = s.grants.filter((g) => g.profileId !== profileId);
  s.logs = s.logs.filter((l) => !grantIds.includes(l.grantId));
}

export function createGrant(input: Omit<IntegrityGrant, "id" | "usedAt">) {
  const row: IntegrityGrant = { ...input, id: uid("grant"), usedAt: null };
  db().grants.push(row);
  return row;
}

export function readGrant(token: string): {
  grant: IntegrityGrant;
  vault: IntegrityVault | null;
  profile: Profile;
} | null {
  const grant = db().grants.find((g) => g.token === token);
  if (!grant) return null;
  if (new Date(grant.expiresAt).getTime() < Date.now()) return null;
  if (grant.singleUse && grant.usedAt) return null;
  const profile = getProfileById(grant.profileId);
  if (!profile) return null;
  const vault = db().vault.find((v) => v.profileId === grant.profileId) ?? null;
  return { grant, vault, profile };
}

export function logGrantView(grantId: string, viewerLabel: string) {
  const grant = db().grants.find((g) => g.id === grantId);
  if (grant?.singleUse) grant.usedAt = nowIso();
  db().logs.push({
    id: uid("log"),
    grantId,
    viewerLabel,
    viewedAt: nowIso(),
  });
}

export function createEvent(input: Omit<EventRecord, "id">) {
  const row: EventRecord = { ...input, id: uid("ev") };
  db().events.push(row);
  return row;
}

export function addCheckin(eventId: string, profile: Profile) {
  const existing = db().checkins.find(
    (c) => c.eventId === eventId && c.profileId === profile.id,
  );
  if (existing) return existing;
  const row: Checkin = {
    id: uid("ck"),
    eventId,
    profileId: profile.id,
    handle: profile.handle,
    checkedInAt: nowIso(),
  };
  db().checkins.push(row);
  return row;
}

export function eventsByOrganizer(profileId: string) {
  return db().events.filter((e) => e.organizerProfileId === profileId);
}

export function checkinsFor(eventId: string) {
  return db().checkins.filter((c) => c.eventId === eventId);
}

export function getEventBySlug(slug: string) {
  return db().events.find((e) => e.slug === slug);
}
