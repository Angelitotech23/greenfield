export type TrustLevel = "declared" | "web2" | "onchain";
export type KycStatus = "none" | "pending" | "approved" | "rejected" | "duplicate";
export type UserRole = "user" | "issuer" | "validator" | "organizer" | "admin";
export type IntegrityStatus = "clear" | "record" | "warrant" | "pending";

export type Profile = {
  id: string;
  walletAddress: string;
  handle: string;
  legalName: string;
  legalNameLocked: boolean;
  displayHeadline: string;
  bio: string;
  avatarUrl: string;
  kycStatus: KycStatus;
  sbtTokenId: string | null;
  integrityLinkEnabled: boolean;
  createdAt: string;
  email?: string;
};

export type Experience = {
  id: string;
  profileId: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isPublic: boolean;
  trustLevel: TrustLevel;
  easUid: string | null;
  locked: boolean;
};

export type Education = {
  id: string;
  profileId: string;
  school: string;
  degree: string;
  field: string;
  year: string;
  isPublic: boolean;
  trustLevel: TrustLevel;
  easUid: string | null;
  locked: boolean;
};

export type Skill = {
  id: string;
  profileId: string;
  name: string;
  isPublic: boolean;
};

export type SocialLink = {
  id: string;
  profileId: string;
  label: string;
  url: string;
  isPublic: boolean;
};

export type Credential = {
  id: string;
  profileId: string;
  title: string;
  issuerName: string;
  issuerId: string | null;
  credentialType: "academic" | "employment" | "brand" | "web2" | "other";
  documentHash: string | null;
  easUid: string | null;
  trustLevel: TrustLevel;
  issuedAt: string;
  isPublic: boolean;
  revokedAt: string | null;
  externalId?: string;
  provider?: string;
};

export type Issuer = {
  id: string;
  name: string;
  kind: "university" | "company" | "brand" | "platform";
  wallet: string;
  verified: boolean;
};

export type IssuerMember = {
  profileId: string;
  issuerId: string;
};

export type IntegrityVault = {
  id: string;
  profileId: string;
  status: IntegrityStatus;
  officialSource: string;
  summary: string;
  expiresAt: string;
  createdAt: string;
};

export type IntegrityGrant = {
  id: string;
  profileId: string;
  token: string;
  label: string;
  expiresAt: string;
  singleUse: boolean;
  usedAt: string | null;
  createdBy: string;
};

export type IntegrityLog = {
  id: string;
  grantId: string;
  viewerLabel: string;
  viewedAt: string;
};

export type Web2Verification = {
  id: string;
  profileId: string;
  provider: "datacamp" | "microsoft" | "coursera";
  externalId: string;
  title: string;
  verifiedAt: string;
  sandbox: boolean;
};

export type EventRecord = {
  id: string;
  organizerProfileId: string;
  name: string;
  slug: string;
  date: string;
  location: string;
};

export type Checkin = {
  id: string;
  eventId: string;
  profileId: string;
  handle: string;
  checkedInAt: string;
};

export type SessionUser = {
  profileId: string;
  roles: UserRole[];
  walletAddress: string;
  email?: string;
};

export type PublicCv = {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  links: SocialLink[];
  credentials: Credential[];
};
