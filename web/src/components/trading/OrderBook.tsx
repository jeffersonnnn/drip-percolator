"use client";

import { useEffect, useRef, useState } from "react";
import { usePriceStore } from "@/stores/usePriceStore";
import { useMarketStore } from "@/stores/useMarketStore";

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

function generateOrderBook(
  midPrice: number,
  levels: number = 14
): { asks: OrderLevel[]; bids: OrderLevel[] } {
  const asks: OrderLevel[] = [];
  const bids: OrderLevel[] = [];
  const tickSize = midPrice < 1 ? 0.0001 : midPrice < 100 ? 0.01 : 0.1;

  let askTotal = 0;
  for (let i = levels; i >= 1; i--) {
    const spread = tickSize * (i + Math.random() * 0.5);
    const price = midPrice + spread;
    const size = parseFloat(
      (Math.random() * 50 + 5 + Math.random() * i * 3).toFixed(2)
    );
    askTotal += size;
    asks.push({ price, size, total: askTotal });
  }
  asks.reverse();
  // Recalculate totals after reverse
  let runningTotal = 0;
  for (let i = asks.length - 1; i >= 0; i--) {
    runningTotal += asks[i].size;
    asks[i].total = runningTotal;
  }

  let bidTotal = 0;
  for (let i = 1; i <= levels; i++) {
    const spread = tickSize * (i + Math.random() * 0.5);
    const price = midPrice - spread;
    const size = parseFloat(
      (Math.random() * 50 + 5 + Math.random() * i * 3).toFixed(2)
    );
    bidTotal += size;
    bids.push({ price, size, total: bidTotal });
  }

  return { asks, bids };
}

export function OrderBook() {
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);
  const [book, setBook] = useState<{
    asks: OrderLevel[];
    bids: OrderLevel[];
  }>({ asks: [], bids: [] });
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!price) return;

    const update = () => {
      setBook(generateOrderBook(price.price));
    };
    update();
    intervalRef.current = setInterval(update, 1500);
    return () => clearInterval(intervalRef.current);
  }, [price?.price]); // eslint-disable-line react-hooks/exhaustive-deps

  const maxTotal = Math.max(
    ...book.asks.map((l) => l.total),
    ...book.bids.map((l) => l.total),
    1
  );

  const spread = book.asks.length && book.bids.length
    ? book.asks[book.asks.length - 1].price - book.bids[0].price
    : 0;
  const spreadPct =
    price?.price && spread > 0 ? ((spread / price.price) * 100).toFixed(3) : "0.000";

  const decimals = price?.price && price.price < 1 ? 6 : price?.price && price.price < 100 ? 3 : 2;

  return (
    <div className="flex flex-col h-full text-[11px] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-border text-muted">
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>

      {/* Asks (sells) — reversed so lowest ask is at bottom */}
      <div className="flex-1 overflow-hidden flex flex-col justify-end">
        {book.asks.map((level, i) => (
          <div
            key={`ask-${i}`}
            className="flex items-center justify-between px-2 py-[2px] relative"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-red/8"
              style={{ width: `${(level.total / maxTotal) * 100}%` }}
            />
            <span className="text-red relative z-10">
              {level.price.toFixed(decimals)}
            </span>
            <span className="text-foreground/70 relative z-10">
              {level.size.toFixed(2)}
            </span>
            <span className="text-foreground/50 relative z-10">
              {level.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="flex items-center justify-between px-2 py-1.5 border-y border-border bg-surface-2/50">
        <span className="text-foreground font-semibold text-xs">
          {price ? price.price.toFixed(decimals) : "—"}
        </span>
        <span className="text-muted">
          Spread {spread.toFixed(decimals)} ({spreadPct}%)
        </span>
      </div>

      {/* Bids (buys) */}
      <div className="flex-1 overflow-hidden">
        {book.bids.map((level, i) => (
          <div
            key={`bid-${i}`}
            className="flex items-center justify-between px-2 py-[2px] relative"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-green/8"
              style={{ width: `${(level.total / maxTotal) * 100}%` }}
            />
            <span className="text-green relative z-10">
              {level.price.toFixed(decimals)}
            </span>
            <span className="text-foreground/70 relative z-10">
              {level.size.toFixed(2)}
            </span>
            <span className="text-foreground/50 relative z-10">
              {level.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
