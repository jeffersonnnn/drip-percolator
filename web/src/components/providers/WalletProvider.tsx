"use client";

import { type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

const ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

// Phantom and Solflare implement the Wallet Standard and are auto-detected.
// Passing an empty array avoids the heavy @solana/wallet-adapter-wallets bundle
// which imports WalletConnect and causes re-render loops.
const WALLETS: never[] = [];

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <ConnectionProvider endpoint={ENDPOINT}>
      <SolanaWalletProvider wallets={WALLETS} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
