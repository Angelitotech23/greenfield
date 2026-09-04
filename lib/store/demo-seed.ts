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
  Skill,
  SocialLink,
  Web2Verification,
} from "@/lib/types";

export const seedProfiles: Profile[] = [
  {
    id: "p_pablo",
    walletAddress: "0xA11CE0000000000000000000000000000000PAB1",
    handle: "pablo",
    legalName: "Pablo Mendoza Quispe",
    legalNameLocked: true,
    displayHeadline: "Founder & CEO en Team Saipit",
    bio: "Construyo puentes entre eventos internacionales y talento de Bolivia. Me interesa la identidad verificable porque en LatAm todavía se contrata por capturas de pantalla.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    kycStatus: "approved",
    sbtTokenId: "1",
    integrityLinkEnabled: true,
    createdAt: "2026-01-12T10:00:00.000Z",
    email: "pablo@saipit.example",
  },
  {
    id: "p_maria",
    walletAddress: "0xB0B000000000000000000000000000000000MAR1",
    handle: "mariavargas",
    legalName: "María Vargas Loza",
    legalNameLocked: true,
    displayHeadline: "Data Analyst · certificaciones Web2 verificadas",
    bio: "Analista en La Paz. Mis cursos de DataCamp y Microsoft Learn están anclados en amarillo: validados por API, no por una universidad on-chain.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    kycStatus: "approved",
    sbtTokenId: "2",
    integrityLinkEnabled: false,
    createdAt: "2026-02-03T10:00:00.000Z",
    email: "maria@example.com",
  },
  {
    id: "p_luis",
    walletAddress: "0xC0DE00000000000000000000000000000000LU15",
    handle: "luistorrez",
    legalName: "Luis Torrez",
    legalNameLocked: false,
    displayHeadline: "Productor de eventos · perfil declarado",
    bio: "Todavía no pasé KYC. Todo lo que ves es información que yo mismo escribí: el semáforo está en blanco.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    kycStatus: "none",
    sbtTokenId: null,
    integrityLinkEnabled: false,
    createdAt: "2026-03-20T10:00:00.000Z",
    email: "luis@example.com",
  },
  {
    id: "p_umsad",
    walletAddress: "0x15500000000000000000000000000000000UMSA",
    handle: "emisor-umsa",
    legalName: "Universidad Mayor de San Andrés",
    legalNameLocked: true,
    displayHeadline: "Emisor académico oficial",
    bio: "Wallet institucional para firmar títulos y constancias.",
    avatarUrl: "",
    kycStatus: "approved",
    sbtTokenId: null,
    integrityLinkEnabled: false,
    createdAt: "2025-11-01T10:00:00.000Z",
    email: "registro@umsa.example",
  },
  {
    id: "p_validador",
    walletAddress: "0xVA11D00000000000000000000000000000000001",
    handle: "validador-oficial",
    legalName: "Mesa de integridad (sandbox)",
    legalNameLocked: true,
    displayHeadline: "Validador de antecedentes — solo off-chain",
    bio: "No firmamos schemas penales en Polygon. Cargamos y borramos el vault.",
    avatarUrl: "",
    kycStatus: "approved",
    sbtTokenId: null,
    integrityLinkEnabled: false,
    createdAt: "2025-11-01T10:00:00.000Z",
    email: "integridad@example.com",
  },
  {
    id: "p_org",
    walletAddress: "0x0R6A000000000000000000000000000000000001",
    handle: "organizador-lab",
    legalName: "Laboratorio de Eventos Andes",
    legalNameLocked: true,
    displayHeadline: "Organizador de eventos",
    bio: "Check-in con el mismo CV/QR. La integridad se consulta con grant, no en la cadena.",
    avatarUrl: "",
    kycStatus: "approved",
    sbtTokenId: null,
    integrityLinkEnabled: false,
    createdAt: "2025-12-01T10:00:00.000Z",
    email: "eventos@andes.example",
  },
];

export const seedExperience: Experience[] = [
  {
    id: "e1",
    profileId: "p_pablo",
    title: "Founder & CEO",
    company: "Team Saipit",
    startDate: "2022-01-01",
    endDate: null,
    description: "Dirección de alianzas y producción de encuentros en LatAm.",
    isPublic: true,
    trustLevel: "onchain",
    easUid: "0xdemo000000000000000000000000000000000000000000000000000000000001",
    locked: true,
  },
  {
    id: "e2",
    profileId: "p_pablo",
    title: "Productor asociado",
    company: "Foro Andes",
    startDate: "2019-03-01",
    endDate: "2021-12-01",
    description: "Agenda de speakers y sponsors internacionales.",
    isPublic: true,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  },
  {
    id: "e3",
    profileId: "p_maria",
    title: "Analista de datos",
    company: "Observatorio Digital",
    startDate: "2023-06-01",
    endDate: null,
    description: "Tableros de adopción digital para gobiernos locales.",
    isPublic: true,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  },
  {
    id: "e4",
    profileId: "p_luis",
    title: "Productor",
    company: "Escena Libre",
    startDate: "2024-01-01",
    endDate: null,
    description: "Festivales y ferias.",
    isPublic: true,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  },
];

export const seedEducation: Education[] = [
  {
    id: "ed1",
    profileId: "p_pablo",
    school: "Universidad Mayor de San Andrés",
    degree: "Licenciatura",
    field: "Comunicación estratégica",
    year: "2018",
    isPublic: true,
    trustLevel: "onchain",
    easUid: "0xdemo000000000000000000000000000000000000000000000000000000000002",
    locked: true,
  },
  {
    id: "ed2",
    profileId: "p_maria",
    school: "Universidad Católica Boliviana",
    degree: "Ingeniería",
    field: "Sistemas",
    year: "2022",
    isPublic: true,
    trustLevel: "declared",
    easUid: null,
    locked: false,
  },
];

export const seedSkills: Skill[] = [
  { id: "s1", profileId: "p_pablo", name: "Producción de eventos", isPublic: true },
  { id: "s2", profileId: "p_pablo", name: "Alianzas estratégicas", isPublic: true },
  { id: "s3", profileId: "p_pablo", name: "Identidad digital", isPublic: true },
  { id: "s4", profileId: "p_maria", name: "SQL", isPublic: true },
  { id: "s5", profileId: "p_maria", name: "Python", isPublic: true },
  { id: "s6", profileId: "p_luis", name: "Logística", isPublic: true },
];

export const seedLinks: SocialLink[] = [
  {
    id: "l1",
    profileId: "p_pablo",
    label: "Sitio",
    url: "https://saipit.example",
    isPublic: true,
  },
  {
    id: "l2",
    profileId: "p_maria",
    label: "GitHub",
    url: "https://github.com/example",
    isPublic: true,
  },
];

export const seedCredentials: Credential[] = [
  {
    id: "c1",
    profileId: "p_pablo",
    title: "Licenciatura en Comunicación estratégica",
    issuerName: "Universidad Mayor de San Andrés",
    issuerId: "iss_umsa",
    credentialType: "academic",
    documentHash: "a3f1c9e8d2b74e01aa91c0d55e001demo001",
    easUid: "0xdemo000000000000000000000000000000000000000000000000000000000002",
    trustLevel: "onchain",
    issuedAt: "2018-12-15T00:00:00.000Z",
    isPublic: true,
    revokedAt: null,
  },
  {
    id: "c2",
    profileId: "p_pablo",
    title: "Representación de marca — Team Saipit",
    issuerName: "Team Saipit",
    issuerId: "iss_saipit",
    credentialType: "brand",
    documentHash: "b91ee0c4d8a12f77demo002",
    easUid: "0xdemo000000000000000000000000000000000000000000000000000000000003",
    trustLevel: "onchain",
    issuedAt: "2024-04-01T00:00:00.000Z",
    isPublic: true,
    revokedAt: null,
  },
  {
    id: "c3",
    profileId: "p_maria",
    title: "Data Analyst with Python",
    issuerName: "DataCamp",
    issuerId: null,
    credentialType: "web2",
    documentHash: null,
    easUid: null,
    trustLevel: "web2",
    issuedAt: "2025-08-10T00:00:00.000Z",
    isPublic: true,
    revokedAt: null,
    externalId: "DC-88421",
    provider: "datacamp",
  },
  {
    id: "c4",
    profileId: "p_maria",
    title: "Microsoft Learn — Azure Fundamentals",
    issuerName: "Microsoft Learn",
    issuerId: null,
    credentialType: "web2",
    documentHash: null,
    easUid: null,
    trustLevel: "web2",
    issuedAt: "2025-09-02T00:00:00.000Z",
    isPublic: true,
    revokedAt: null,
    externalId: "MS-AZ900-10293",
    provider: "microsoft",
  },
  {
    id: "c5",
    profileId: "p_luis",
    title: "Diplomado en producción cultural",
    issuerName: "Instituto Autodeclarado",
    issuerId: null,
    credentialType: "other",
    documentHash: null,
    easUid: null,
    trustLevel: "declared",
    issuedAt: "2024-01-01T00:00:00.000Z",
    isPublic: true,
    revokedAt: null,
  },
];

export const seedIssuers: Issuer[] = [
  {
    id: "iss_umsa",
    name: "Universidad Mayor de San Andrés",
    kind: "university",
    wallet: "0x15500000000000000000000000000000000UMSA",
    verified: true,
  },
  {
    id: "iss_saipit",
    name: "Team Saipit",
    kind: "company",
    wallet: "0xA11CE0000000000000000000000000000000PAB1",
    verified: true,
  },
  {
    id: "iss_platform",
    name: "Pasaporte Profesional",
    kind: "platform",
    wallet: "0xPLAT000000000000000000000000000000000001",
    verified: true,
  },
];

export const seedIssuerMembers: IssuerMember[] = [
  { profileId: "p_umsad", issuerId: "iss_umsa" },
  { profileId: "p_pablo", issuerId: "iss_saipit" },
];

export const seedVault: IntegrityVault[] = [
  {
    id: "v1",
    profileId: "p_pablo",
    status: "clear",
    officialSource: "Sandbox — entidad habilitada (demo)",
    summary:
      "Sin registros penales vigentes según la fuente oficial de demostración. Este texto NUNCA se escribe en Polygon.",
    expiresAt: "2027-01-12T00:00:00.000Z",
    createdAt: "2026-01-12T12:00:00.000Z",
  },
];

export const seedGrants: IntegrityGrant[] = [
  {
    id: "g1",
    profileId: "p_pablo",
    token: "grant-pablo-demo",
    label: "Revisión de organizador (demo)",
    expiresAt: "2027-12-31T00:00:00.000Z",
    singleUse: false,
    usedAt: null,
    createdBy: "p_pablo",
  },
];

export const seedLogs: IntegrityLog[] = [];

export const seedWeb2: Web2Verification[] = [
  {
    id: "w1",
    profileId: "p_maria",
    provider: "datacamp",
    externalId: "DC-88421",
    title: "Data Analyst with Python",
    verifiedAt: "2025-08-10T00:00:00.000Z",
    sandbox: true,
  },
];

export const seedEvents: EventRecord[] = [
  {
    id: "ev1",
    organizerProfileId: "p_org",
    name: "Cumbre Andes 2026",
    slug: "cumbre-andes-2026",
    date: "2026-09-12",
    location: "La Paz, Bolivia",
  },
];

export const seedCheckins: Checkin[] = [];

export const seedUniqueness: { hash: string; profileId: string }[] = [
  { hash: "uniq_pablo_mendoza_demo", profileId: "p_pablo" },
  { hash: "uniq_maria_vargas_demo", profileId: "p_maria" },
];

export const seedRoles: Record<string, import("@/lib/types").UserRole[]> = {
  p_pablo: ["user", "issuer"],
  p_maria: ["user"],
  p_luis: ["user"],
  p_umsad: ["issuer"],
  p_validador: ["validator"],
  p_org: ["organizer"],
};
