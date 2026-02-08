"use client";

import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { cn } from "@/lib/utils";

export function MarketStats() {
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  if (!price) return null;

  const isPositive = price.change24h >= 0;

  // Simulated stats
  const volume24h = price.price * (450000 + Math.floor(price.price * 123));
  const openInterest = price.price * (120000 + Math.floor(price.price * 45));

  return (
    <div className="flex items-center gap-5 text-xs font-mono">
      <div>
        <span
          className={cn(
            "text-lg font-bold tabular-nums",
            isPositive ? "text-green" : "text-red"
          )}
        >
          ${price.price.toFixed(selectedMarket.pricePrecision)}
        </span>
      </div>

      <Stat
        label="24h Change"
        value={`${isPositive ? "+" : ""}${price.changePct24h.toFixed(2)}%`}
        valueClass={isPositive ? "text-green" : "text-red"}
      />
      <Stat
        label="24h Volume"
        value={formatCompact(volume24h)}
        valueClass="text-foreground"
      />
      <Stat
        label="Open Interest"
        value={formatCompact(openInterest)}
        valueClass="text-foreground"
      />
      <Stat
        label="Index Price"
        value={`$${price.price.toFixed(selectedMarket.pricePrecision)}`}
        valueClass="text-foreground"
      />
      <Stat label="Funding" value="0.0100%" valueClass="text-green" />
      <Stat label="Next Funding" value="04:32:15" valueClass="text-foreground/60" />
    </div>
  );
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-muted text-xxs">{label}</span>
      <span className={cn("tabular-nums", valueClass)}>{value}</span>
    </div>
  );
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}
