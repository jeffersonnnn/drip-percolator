"use client";

import dynamic from "next/dynamic";
import { ChartControls } from "./ChartControls";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";

const ChartCanvas = dynamic(() => import("./ChartCanvas"), { ssr: false });

const EMPTY_CANDLES: never[] = [];

export function TradingChart() {
  const { selectedMarket } = useMarketStore();
  const candles =
    usePriceStore((s) => s.candles[selectedMarket.symbol]) ?? EMPTY_CANDLES;

  return (
    <div className="flex flex-col h-full bg-surface">
      <ChartControls />
      <div className="flex-1 relative">
        <ChartCanvas candles={candles} />
        {candles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted text-xs font-mono pointer-events-none">
            Loading chart data...
          </div>
        )}
      </div>
    </div>
  );
}
