"use client";

import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { PercolatorClient } from "@/lib/percolator/client";

export function usePercolator() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const client = useMemo(() => {
    const slabAddress = process.env.NEXT_PUBLIC_SLAB_ADDRESS_SOL;
    if (!slabAddress) return null;

    try {
      return new PercolatorClient(
        connection,
        new PublicKey(slabAddress)
      );
    } catch {
      return null;
    }
  }, [connection]);

  return { client, publicKey };
}
