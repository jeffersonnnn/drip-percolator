"use client";

import { useMarketStore } from "@/stores/useMarketStore";
import { cn } from "@/lib/utils";

export function MarketSelector() {
  const { markets, selectedMarket, setSelectedMarket } = useMarketStore();

  return (
    <div className="flex items-center gap-1">
      {markets.map((market) => (
        <button
          key={market.id}
          onClick={() => setSelectedMarket(market.id)}
          className={cn(
            "px-3 py-1.5 text-xs font-mono rounded transition-colors",
            selectedMarket.id === market.id
              ? "bg-surface-2 text-foreground border border-border"
              : "text-muted hover:text-foreground hover:bg-surface-2/50"
          )}
        >
          {market.name}
        </button>
      ))}
    </div>
  );
}
