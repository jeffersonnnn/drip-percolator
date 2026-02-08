"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomPanel } from "@/components/layout/BottomPanel";
import { TradingChart } from "@/components/charts/TradingChart";
import { OrderBookPanel } from "@/components/trading/OrderBookPanel";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { MarketSidebar } from "@/components/market/MarketSidebar";
import { ToastContainer } from "@/components/ui/Toast";
import { usePrices } from "@/hooks/usePrices";
import { useSlabData } from "@/hooks/useSlabData";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export default function TradingTerminal() {
  usePrices();
  useSlabData();
  useKeyboardShortcuts();

  const [showMobileOrder, setShowMobileOrder] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Market sidebar */}
        <div className="max-lg:hidden">
          <MarketSidebar />
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 min-h-0 relative">
            <TradingChart />
          </div>

          <div className="h-[220px] min-h-[180px] max-lg:h-[180px]">
            <BottomPanel />
          </div>
        </div>

        {/* Order Book / Trades panel */}
        <div className="max-lg:hidden">
          <OrderBookPanel />
        </div>

        {/* Order entry panel */}
        <div className="max-lg:hidden">
          <OrderPanel />
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 bg-surface border-t border-border flex items-center px-3 justify-between" suppressHydrationWarning>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-[10px] font-mono text-green">Online</span>
          </div>
          <span className="text-[10px] font-mono text-muted">
            Solana Devnet
          </span>
          <span className="text-[10px] font-mono text-muted" suppressHydrationWarning>
            Block: {Math.floor(Date.now() / 400).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted">
            Latency: 45ms
          </span>
          <span className="text-[10px] font-mono text-muted">
            Pyth: Connected
          </span>
          <span className="text-[10px] font-mono text-foreground/40">
            Percolator v0.1.0
          </span>
        </div>
      </div>

      {/* Mobile trade button */}
      <button
        onClick={() => setShowMobileOrder(!showMobileOrder)}
        className="lg:hidden fixed bottom-10 right-4 z-50 bg-cyan text-background font-mono font-bold text-sm px-6 py-3 rounded-lg shadow-lg shadow-cyan/20"
      >
        Trade
      </button>

      {/* Mobile order panel overlay */}
      {showMobileOrder && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 flex justify-end">
          <div className="w-[320px] h-full">
            <OrderPanel />
          </div>
          <button
            onClick={() => setShowMobileOrder(false)}
            className="absolute top-4 left-4 text-muted text-2xl"
          >
            &times;
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
