"use client";

import dynamic from "next/dynamic";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { MarketStats } from "@/components/market/MarketStats";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export function TopBar() {
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  return (
    <div className="h-14 bg-surface border-b border-border flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-green flex items-center justify-center">
          <span className="text-background font-bold text-sm">D</span>
        </div>
        <span className="font-mono font-bold text-foreground text-sm tracking-wide">
          DRIP
        </span>
      </div>

      {/* Selected market */}
      <div className="flex items-center gap-2 shrink-0 border-l border-border pl-4">
        <span className="font-mono font-bold text-foreground text-sm">
          {selectedMarket.name}
        </span>
        <span className="text-[9px] font-mono text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">
          {selectedMarket.maxLeverage}x
        </span>
      </div>

      {/* Market stats */}
      <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none">
        {price && <MarketStats />}
      </div>

      {/* Right side - always visible */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-xxs text-muted font-mono">devnet</div>
        <WalletMultiButton />
      </div>
    </div>
  );
}
