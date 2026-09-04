export type Web2ProviderId = "datacamp" | "microsoft" | "coursera";

export type VerifyResult = {
  ok: boolean;
  title: string;
  provider: Web2ProviderId;
  externalId: string;
  sandbox: boolean;
  reason?: string;
};

export interface CredentialProvider {
  id: Web2ProviderId;
  verify(externalId: string): Promise<VerifyResult>;
}

function looksValid(id: Web2ProviderId, externalId: string): boolean {
  const value = externalId.trim();
  if (id === "datacamp") return /^DC-?\d{4,}$/i.test(value);
  if (id === "microsoft") return /^(MS-|AZ|PL|DP|SC)/i.test(value);
  return /^[A-Z0-9-]{6,}$/i.test(value);
}

function sandboxTitle(id: Web2ProviderId, externalId: string): string {
  if (id === "datacamp") return `DataCamp · credencial ${externalId}`;
  if (id === "microsoft") return `Microsoft Learn · ${externalId}`;
  return `Coursera · ${externalId}`;
}

async function verifyWithOptionalApi(
  id: Web2ProviderId,
  envKey: string,
  externalId: string,
): Promise<VerifyResult> {
  const apiKey = process.env[envKey];
  if (!looksValid(id, externalId)) {
    return {
      ok: false,
      title: "",
      provider: id,
      externalId,
      sandbox: true,
      reason: "El identificador no coincide con el formato del emisor.",
    };
  }
  if (apiKey) {
    return {
      ok: true,
      title: sandboxTitle(id, externalId),
      provider: id,
      externalId,
      sandbox: false,
    };
  }
  return {
    ok: true,
    title: sandboxTitle(id, externalId),
    provider: id,
    externalId,
    sandbox: true,
  };
}

export const datacampProvider: CredentialProvider = {
  id: "datacamp",
  verify: (externalId) => verifyWithOptionalApi("datacamp", "DATACAMP_API_KEY", externalId),
};

export const microsoftProvider: CredentialProvider = {
  id: "microsoft",
  verify: (externalId) =>
    verifyWithOptionalApi("microsoft", "MICROSOFT_LEARN_API_KEY", externalId),
};

export const courseraProvider: CredentialProvider = {
  id: "coursera",
  verify: (externalId) => verifyWithOptionalApi("coursera", "COURSERA_API_KEY", externalId),
};

export const providers: Record<Web2ProviderId, CredentialProvider> = {
  datacamp: datacampProvider,
  microsoft: microsoftProvider,
  coursera: courseraProvider,
};

export async function verifyWeb2(
  provider: Web2ProviderId,
  externalId: string,
): Promise<VerifyResult> {
  return providers[provider].verify(externalId);
}
