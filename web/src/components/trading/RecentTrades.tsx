"use client";

import { useEffect, useRef, useState } from "react";
import { usePriceStore } from "@/stores/usePriceStore";
import { useMarketStore } from "@/stores/useMarketStore";

interface Trade {
  id: number;
  price: number;
  size: number;
  side: "buy" | "sell";
  time: string;
}

let tradeIdCounter = 0;

function generateTrade(midPrice: number): Trade {
  const side = Math.random() > 0.48 ? "buy" : "sell";
  const deviation = midPrice * (Math.random() * 0.001);
  const price = side === "buy" ? midPrice + deviation : midPrice - deviation;
  const size = parseFloat((Math.random() * 20 + 0.1).toFixed(3));
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  return { id: ++tradeIdCounter, price, size, side, time };
}

function generateInitialTrades(midPrice: number, count: number): Trade[] {
  const trades: Trade[] = [];
  for (let i = 0; i < count; i++) {
    trades.push(generateTrade(midPrice));
  }
  return trades;
}

export function RecentTrades() {
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!price) return;

    if (trades.length === 0) {
      setTrades(generateInitialTrades(price.price, 30));
    }

    intervalRef.current = setInterval(() => {
      const currentPrice = usePriceStore.getState().prices[selectedMarket.symbol]?.price;
      if (!currentPrice) return;

      const batchSize = Math.floor(Math.random() * 3) + 1;
      const newTrades: Trade[] = [];
      for (let i = 0; i < batchSize; i++) {
        newTrades.push(generateTrade(currentPrice));
      }
      setTrades((prev) => [...newTrades, ...prev].slice(0, 50));
    }, 800 + Math.random() * 1200);

    return () => clearInterval(intervalRef.current);
  }, [price?.price, selectedMarket.symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  const decimals = price?.price && price.price < 1 ? 6 : price?.price && price.price < 100 ? 3 : 2;

  return (
    <div className="flex flex-col h-full text-[11px] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-border text-muted">
        <span>Price</span>
        <span>Size</span>
        <span>Time</span>
      </div>

      {/* Trades list */}
      <div className="flex-1 overflow-y-auto">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between px-2 py-[2px] hover:bg-surface-2/30"
          >
            <span
              className={
                trade.side === "buy" ? "text-green" : "text-red"
              }
            >
              {trade.price.toFixed(decimals)}
            </span>
            <span className="text-foreground/70">{trade.size.toFixed(3)}</span>
            <span className="text-foreground/40">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
