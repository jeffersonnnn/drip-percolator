"use client";

import { useState } from "react";
import { PositionsTable } from "@/components/positions/PositionsTable";
import { TradeHistory } from "@/components/positions/TradeHistory";
import { cn } from "@/lib/utils";

const tabs = [
  "Balances",
  "Positions",
  "Open Orders",
  "Trade History",
  "Funding History",
  "Order History",
] as const;
type Tab = (typeof tabs)[number];

export function BottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("Positions");

  return (
    <div className="bg-surface border-t border-border flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border px-2 justify-between">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-[11px] font-mono transition-colors relative whitespace-nowrap",
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
        <div className="flex items-center gap-2">
          <button className="text-xxs font-mono text-muted hover:text-foreground px-2 py-1 border border-border rounded transition-colors">
            Filter ▾
          </button>
          <label className="flex items-center gap-1.5 text-xxs font-mono text-muted cursor-pointer">
            <input type="checkbox" className="accent-cyan w-3 h-3" />
            Hide Small Balances
          </label>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "Balances" && <BalancesTable />}
        {activeTab === "Positions" && <PositionsTable />}
        {activeTab === "Open Orders" && (
          <EmptyState text="No open orders" />
        )}
        {activeTab === "Trade History" && <TradeHistory />}
        {activeTab === "Funding History" && <FundingHistoryTable />}
        {activeTab === "Order History" && (
          <EmptyState text="No order history" />
        )}
        {activeTab === "Balances" || activeTab === "Positions" ? null : null}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-full text-muted text-xs font-mono">
      {text}
    </div>
  );
}

function BalancesTable() {
  const coins = [
    { coin: "USDC", total: "0.00", available: "0.00", usdcValue: "$0.00", pnl: "—", contract: "—" },
    { coin: "SOL", total: "0.00", available: "0.00", usdcValue: "$0.00", pnl: "—", contract: "—" },
    { coin: "BTC", total: "0.00", available: "0.00", usdcValue: "$0.00", pnl: "—", contract: "—" },
    { coin: "ETH", total: "0.00", available: "0.00", usdcValue: "$0.00", pnl: "—", contract: "—" },
  ];

  return (
    <div className="text-[11px] font-mono">
      <div className="flex items-center px-3 py-1.5 border-b border-border text-muted bg-surface-2/30">
        <span className="w-20">Coin</span>
        <span className="flex-1 text-right">Total Balance</span>
        <span className="flex-1 text-right">Available Balance</span>
        <span className="flex-1 text-right">USDC Value</span>
        <span className="flex-1 text-right">PNL (ROE %)</span>
        <span className="flex-1 text-right">Contract</span>
      </div>
      {coins.map((c) => (
        <div
          key={c.coin}
          className="flex items-center px-3 py-1.5 hover:bg-surface-2/20 text-foreground/70"
        >
          <span className="w-20 text-foreground">{c.coin}</span>
          <span className="flex-1 text-right">{c.total}</span>
          <span className="flex-1 text-right">{c.available}</span>
          <span className="flex-1 text-right">{c.usdcValue}</span>
          <span className="flex-1 text-right">{c.pnl}</span>
          <span className="flex-1 text-right">{c.contract}</span>
        </div>
      ))}
    </div>
  );
}

function FundingHistoryTable() {
  const entries = [
    { time: "2026-02-08 12:00", market: "SOL-PERP", payment: "+$0.012", rate: "0.0100%", position: "1.5 SOL" },
    { time: "2026-02-08 08:00", market: "SOL-PERP", payment: "+$0.008", rate: "0.0085%", position: "1.5 SOL" },
    { time: "2026-02-08 04:00", market: "SOL-PERP", payment: "-$0.003", rate: "-0.0032%", position: "1.5 SOL" },
    { time: "2026-02-08 00:00", market: "BTC-PERP", payment: "+$0.045", rate: "0.0100%", position: "0.001 BTC" },
    { time: "2026-02-07 20:00", market: "SOL-PERP", payment: "+$0.011", rate: "0.0095%", position: "1.5 SOL" },
  ];

  return (
    <div className="text-[11px] font-mono">
      <div className="flex items-center px-3 py-1.5 border-b border-border text-muted bg-surface-2/30">
        <span className="w-36">Time</span>
        <span className="w-24">Market</span>
        <span className="flex-1 text-right">Payment</span>
        <span className="flex-1 text-right">Rate</span>
        <span className="flex-1 text-right">Position Size</span>
      </div>
      {entries.map((e, i) => (
        <div
          key={i}
          className="flex items-center px-3 py-1.5 hover:bg-surface-2/20 text-foreground/70"
        >
          <span className="w-36 text-foreground/50">{e.time}</span>
          <span className="w-24">{e.market}</span>
          <span
            className={cn(
              "flex-1 text-right",
              e.payment.startsWith("+") ? "text-green" : "text-red"
            )}
          >
            {e.payment}
          </span>
          <span className="flex-1 text-right">{e.rate}</span>
          <span className="flex-1 text-right">{e.position}</span>
        </div>
      ))}
    </div>
  );
}
