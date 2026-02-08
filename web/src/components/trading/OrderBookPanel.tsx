"use client";

import { useState } from "react";
import { OrderBook } from "./OrderBook";
import { RecentTrades } from "./RecentTrades";
import { DepthChart } from "./DepthChart";
import { cn } from "@/lib/utils";

const tabs = ["Order Book", "Trades", "Depth"] as const;
type Tab = (typeof tabs)[number];

export function OrderBookPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("Order Book");

  return (
    <div className="bg-surface border-l border-border h-full flex flex-col w-[240px]">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 px-2 py-2 text-[11px] font-mono transition-colors relative",
              activeTab === tab
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "Order Book" && <OrderBook />}
        {activeTab === "Trades" && <RecentTrades />}
        {activeTab === "Depth" && <DepthChart />}
      </div>
    </div>
  );
}
