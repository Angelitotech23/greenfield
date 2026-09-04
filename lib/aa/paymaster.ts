export type PaymasterStatus = {
  ready: boolean;
  bundler: "pimlico" | "none";
  chainId: number;
  note: string;
};

export function paymasterStatus(): PaymasterStatus {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 80002);
  const key = process.env.PIMLICO_API_KEY;
  if (!key) {
    return {
      ready: false,
      bundler: "none",
      chainId,
      note: "Sin PIMLICO_API_KEY. En demo, las transacciones on-chain se simulan en el relayer.",
    };
  }
  return {
    ready: true,
    bundler: "pimlico",
    chainId,
    note: "Paymaster listo para patrocinar gas de usuarios Web2 (embedded wallet + AA).",
  };
}

export function pimlicoUrl(chainName = "polygon-amoy"): string | null {
  const key = process.env.PIMLICO_API_KEY;
  if (!key) return null;
  return `https://api.pimlico.io/v2/${chainName}/rpc?apikey=${key}`;
}
