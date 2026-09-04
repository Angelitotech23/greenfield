"use client";

import { hasPrivy } from "@/lib/utils";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  if (!hasPrivy()) {
    return <>{children}</>;
  }
  return <PrivyGate>{children}</PrivyGate>;
}

function PrivyGate({ children }: { children: ReactNode }) {
  const { PrivyProvider } = require("@privy-io/react-auth") as typeof import("@privy-io/react-auth");
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: { theme: "light", accentColor: "#2f9e6b" },
        loginMethods: ["email", "google", "wallet"],
        embeddedWallets: { createOnLogin: "users-without-wallets" },
        defaultChain: {
          id: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 80002),
          name: "Polygon Amoy",
          network: "polygon-amoy",
          nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
          rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc-amoy.polygon.technology"] } },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
