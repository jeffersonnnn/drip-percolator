"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";

export function MarginInfo() {
  const { size, leverage, side } = useTradeStore();
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  if (!size || !price || parseFloat(size) <= 0) return null;

  const sizeNum = parseFloat(size);
  const notional = sizeNum * price.price;
  const margin = notional / leverage;
  const fee = notional * 0.001; // 0.1% taker fee estimate

  // Rough liq price estimate
  const liqDistance = price.price / leverage;
  const liqPrice =
    side === "long"
      ? price.price - liqDistance * 0.9
      : price.price + liqDistance * 0.9;

  return (
    <div className="bg-surface-2 rounded-md p-3 space-y-2">
      <Row label="Required Margin" value={`$${margin.toFixed(2)}`} />
      <Row
        label="Est. Liq. Price"
        value={`$${liqPrice.toFixed(selectedMarket.pricePrecision)}`}
      />
      <Row label="Trading Fee" value={`$${fee.toFixed(2)}`} />
      <Row label="Notional" value={`$${notional.toFixed(2)}`} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xxs font-mono text-muted">{label}</span>
      <span className="text-xxs font-mono text-foreground">{value}</span>
    </div>
  );
}
