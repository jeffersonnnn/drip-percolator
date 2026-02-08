"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTrading } from "@/hooks/useTrading";

export function LongShortButtons() {
  const { setSide, size } = useTradeStore();
  const { connected } = useWallet();
  const { executeTrade, isSubmitting } = useTrading();

  const disabled =
    !connected || !size || parseFloat(size) <= 0 || isSubmitting;

  const handleTrade = async (side: "long" | "short") => {
    setSide(side);
    const result = await executeTrade();
    if (!result.success) {
      console.error("Trade failed:", result.error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleTrade("long")}
        disabled={disabled}
        className="flex-1 py-3 rounded-md font-mono text-sm font-bold transition-all
          bg-green/10 text-green border border-green/30
          hover:bg-green/20 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green/10 disabled:hover:shadow-none"
      >
        {isSubmitting ? "..." : "Long"}
      </button>
      <button
        onClick={() => handleTrade("short")}
        disabled={disabled}
        className="flex-1 py-3 rounded-md font-mono text-sm font-bold transition-all
          bg-red/10 text-red border border-red/30
          hover:bg-red/20 hover:shadow-[0_0_20px_rgba(255,51,85,0.15)]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red/10 disabled:hover:shadow-none"
      >
        {isSubmitting ? "..." : "Short"}
      </button>
    </div>
  );
}
