"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
// Import from @coinbase/onchainkit instead of @farcaster/miniapp-sdk
import { miniAppConnector } from "@coinbase/onchainkit/minikit";

// Create a client for React Query
const queryClient = new QueryClient();

// Create wagmi config
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    miniAppConnector({
      chains: [base],
    }),
  ],
});

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <MiniKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: "auto",
              theme: "reel-rumble",
              name: "ReelRumble",
              logo: process.env.NEXT_PUBLIC_ICON_URL,
            },
          }}
        >
          {props.children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
