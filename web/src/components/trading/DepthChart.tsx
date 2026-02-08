"use client";

import { useMemo } from "react";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";

export function DepthChart() {
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  const { bids, asks, maxTotal } = useMemo(() => {
    if (!price) return { bids: [], asks: [], maxTotal: 0 };
    const mid = price.price;
    const spread = mid * 0.002;
    const levels = 20;

    const bidLevels: { price: number; total: number }[] = [];
    const askLevels: { price: number; total: number }[] = [];
    let bidTotal = 0;
    let askTotal = 0;

    for (let i = 0; i < levels; i++) {
      const bidSize = 20 + Math.random() * 80 + i * 5;
      const askSize = 20 + Math.random() * 80 + i * 5;
      bidTotal += bidSize;
      askTotal += askSize;
      bidLevels.push({ price: mid - spread * (i + 1), total: bidTotal });
      askLevels.push({ price: mid + spread * (i + 1), total: askTotal });
    }

    return {
      bids: bidLevels,
      asks: askLevels,
      maxTotal: Math.max(bidTotal, askTotal),
    };
  }, [price]);

  if (!price) return <div className="flex items-center justify-center h-full text-muted text-xs font-mono">No data</div>;

  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex-1 flex relative">
        {/* Bids (left, green) */}
        <div className="flex-1 flex flex-col justify-end relative">
          {bids.map((level, i) => {
            const width = (level.total / maxTotal) * 100;
            return (
              <div key={i} className="relative h-[3.5%]">
                <div
                  className="absolute right-0 top-0 bottom-0 bg-green/15"
                  style={{ width: `${width}%` }}
                />
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 right-0 border-t border-green/20">
            <svg className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 100">
              <polyline
                fill="none"
                stroke="rgb(0, 255, 136)"
                strokeWidth="1.5"
                points={bids.map((b, i) => `${100 - (b.total / maxTotal) * 100},${(i / bids.length) * 100}`).join(" ")}
              />
            </svg>
          </div>
        </div>

        {/* Asks (right, red) */}
        <div className="flex-1 flex flex-col justify-end relative">
          {asks.map((level, i) => {
            const width = (level.total / maxTotal) * 100;
            return (
              <div key={i} className="relative h-[3.5%]">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-red/15"
                  style={{ width: `${width}%` }}
                />
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 right-0 border-t border-red/20">
            <svg className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 100">
              <polyline
                fill="none"
                stroke="rgb(255, 51, 85)"
                strokeWidth="1.5"
                points={asks.map((a, i) => `${(a.total / maxTotal) * 100},${(i / asks.length) * 100}`).join(" ")}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mid price */}
      <div className="text-center py-1.5 border-t border-border">
        <span className="text-[10px] font-mono text-foreground">
          Mid: ${price.price.toFixed(selectedMarket.pricePrecision)}
        </span>
      </div>
    </div>
  );
}
