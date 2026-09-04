import { sha256Hex } from "@/lib/utils";

export type KycStartResult = {
  provider: "sumsub" | "demo";
  applicantId: string;
  accessToken?: string;
  demo: boolean;
};

export async function uniquenessHash(input: {
  subjectId: string;
  legalName: string;
}): Promise<string> {
  const secret = process.env.UNIQUENESS_HMAC_SECRET ?? "demo-hmac";
  return sha256Hex(`${secret}:${input.subjectId}:${input.legalName.toLowerCase().trim()}`);
}

export async function startKyc(profileId: string): Promise<KycStartResult> {
  const token = process.env.SUMSUB_APP_TOKEN;
  if (!token) {
    return {
      provider: "demo",
      applicantId: `demo_${profileId}`,
      demo: true,
    };
  }
  return {
    provider: "sumsub",
    applicantId: `sumsub_${profileId}`,
    accessToken: "configure-sumsub-token",
    demo: false,
  };
}

export function verifySumsubWebhook(signature: string | null, rawBody: string): boolean {
  const secret = process.env.SUMSUB_WEBHOOK_SECRET;
  if (!secret) return true;
  return Boolean(signature && rawBody);
}
