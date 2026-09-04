export const EAS_SCHEMAS = {
  IdentityVerified: {
    name: "IdentityVerified",
    schema: "bytes32 uniquenessCommitment,uint64 verifiedAt",
    revocable: false,
    note: "No PII. No dato penal. Solo prueba de unicidad.",
  },
  AcademicCredential: {
    name: "AcademicCredential",
    schema: "bytes32 documentHash,bytes32 credentialType,uint64 issuedAt",
    revocable: true,
    note: "Título o certificado. El texto vive off-chain.",
  },
  EmploymentAttestation: {
    name: "EmploymentAttestation",
    schema: "bytes32 documentHash,bytes32 credentialType,bytes32 roleHash,uint64 issuedAt",
    revocable: true,
    note: "Constancia laboral firmada por la empresa.",
  },
  BrandRepresentation: {
    name: "BrandRepresentation",
    schema: "bytes32 brandId,uint64 validUntil",
    revocable: true,
    note: "Representación de marca / sponsor.",
  },
  Web2Credential: {
    name: "Web2Credential",
    schema: "bytes32 provider,bytes32 externalIdHash",
    revocable: true,
    note: "Ancla opcional de una verificación Web2 (semáforo amarillo).",
  },
} as const;

export const FORBIDDEN_EAS = [
  "BackgroundCheck",
  "CriminalRecord",
  "Warrant",
  "flagged",
] as const;

export const EAS_ADDRESSES = {
  amoy: {
    eas: "0xb101275a60d8bfb14529C421899aD7CA1Ae5B5Fc",
    schemaRegistry: "0x23c5701A1BDa89C61d181BD79E5203c730708AE7",
  },
  polygon: {
    eas: "0x5E634ef5355f45A855d02D66eCD687b1502AF790",
    schemaRegistry: "0x7876EEF51A891E737AF8ba5A5E0f0Fd29073D5a7",
  },
} as const;

export function schemaUidPlaceholder(name: string): string {
  const map: Record<string, string> = {
    IdentityVerified: process.env.EAS_SCHEMA_IDENTITY ?? "0xschema_identity_demo",
    AcademicCredential: process.env.EAS_SCHEMA_ACADEMIC ?? "0xschema_academic_demo",
    EmploymentAttestation: process.env.EAS_SCHEMA_EMPLOYMENT ?? "0xschema_employment_demo",
    BrandRepresentation: process.env.EAS_SCHEMA_BRAND ?? "0xschema_brand_demo",
    Web2Credential: process.env.EAS_SCHEMA_WEB2 ?? "0xschema_web2_demo",
  };
  return map[name] ?? "0xschema_unknown";
}
