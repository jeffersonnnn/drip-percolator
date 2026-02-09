"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountStore } from "@/stores/useAccountStore";
import { useWallet } from "@solana/wallet-adapter-react";
import { PositionsTable } from "@/components/positions/PositionsTable";
import { TradeHistory } from "@/components/positions/TradeHistory";
import { usePrices } from "@/hooks/usePrices";
import { useSlabData } from "@/hooks/useSlabData";
import { cn } from "@/lib/utils";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const tabs = [
  "Positions",
  "Trade History",
  "Balances",
  "Funding History",
  "Deposits & Withdrawals",
] as const;
type Tab = (typeof tabs)[number];

export default function PortfolioPage() {
  usePrices();
  useSlabData();

  const { connected } = useWallet();
  const { balance, equity, unrealizedPnl, marginUsed, availableMargin } =
    useAccountStore();
  const [activeTab, setActiveTab] = useState<Tab>("Positions");

  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* TopBar */}
      <div className="h-14 bg-surface border-b border-border flex items-center px-4 gap-4 shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-green flex items-center justify-center">
            <span className="text-background font-bold text-sm">D</span>
          </div>
          <span className="font-mono font-bold text-foreground text-sm tracking-wide">
            DRIP
          </span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-1 border-l border-border pl-4">
          <NavLink href="/trade" label="Trade" />
          <NavLink href="/portfolio" label="Portfolio" />
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xxs text-muted font-mono">devnet</div>
          <WalletMultiButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page header */}
          <h1 className="font-mono font-bold text-xl text-foreground mb-6">
            Portfolio
          </h1>

          {/* Account Summary Cards */}
          {!connected ? (
            <div className="bg-surface border border-border rounded-lg p-12 text-center mb-8">
              <p className="text-muted font-mono text-sm mb-4">
                Connect your wallet to view your portfolio
              </p>
              <WalletMultiButton />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <SummaryCard label="Account Balance" value={`$${balance.toFixed(2)}`} />
              <SummaryCard
                label="Unrealized PnL"
                value={`${unrealizedPnl >= 0 ? "+" : ""}$${unrealizedPnl.toFixed(2)}`}
                valueColor={
                  unrealizedPnl > 0
                    ? "text-green"
                    : unrealizedPnl < 0
                      ? "text-red"
                      : undefined
                }
              />
              <SummaryCard label="Total Equity" value={`$${equity.toFixed(2)}`} />
              <SummaryCard
                label="Available Margin"
                value={`$${availableMargin.toFixed(2)}`}
              />
              <SummaryCard label="Margin Used" value={`$${marginUsed.toFixed(2)}`} />
            </div>
          )}

          {/* PnL Chart placeholder */}
          <div className="bg-surface border border-border rounded-lg mb-8">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="font-mono font-bold text-sm text-foreground">
                Account Value
              </span>
              <div className="flex items-center gap-2">
                {["7D", "30D", "All"].map((tf) => (
                  <button
                    key={tf}
                    className="text-xxs font-mono text-muted hover:text-foreground px-2 py-1 rounded border border-border hover:border-foreground/20 transition-colors"
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 flex items-center justify-center">
              <span className="text-muted text-xs font-mono">
                {connected
                  ? "No PnL data yet — start trading to see your chart"
                  : "Connect wallet to view PnL chart"}
              </span>
            </div>
          </div>

          {/* Tabbed Section */}
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center border-b border-border px-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-2.5 text-[11px] font-mono transition-colors relative whitespace-nowrap shrink-0",
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

            {/* Tab content */}
            <div className="min-h-[300px]">
              {activeTab === "Positions" && <PositionsTable />}
              {activeTab === "Trade History" && <TradeHistory />}
              {activeTab === "Balances" && <BalancesSection />}
              {activeTab === "Funding History" && <FundingSection />}
              {activeTab === "Deposits & Withdrawals" && (
                <EmptyState text="No deposit or withdrawal history" />
              )}
            </div>
          </div>

          {/* Fees Display */}
          <div className="mt-8 bg-surface border border-border rounded-lg p-4">
            <h3 className="font-mono font-bold text-sm text-foreground mb-3">
              Fee Schedule
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xxs font-mono text-muted mb-1">
                  Taker Fee
                </div>
                <div className="text-sm font-mono font-bold text-foreground">
                  0.05%
                </div>
              </div>
              <div>
                <div className="text-xxs font-mono text-muted mb-1">
                  Maker Fee
                </div>
                <div className="text-sm font-mono font-bold text-foreground">
                  0.02%
                </div>
              </div>
              <div>
                <div className="text-xxs font-mono text-muted mb-1">
                  Liquidation Fee
                </div>
                <div className="text-sm font-mono font-bold text-foreground">
                  0.50%
                </div>
              </div>
              <div>
                <div className="text-xxs font-mono text-muted mb-1">
                  Funding Interval
                </div>
                <div className="text-sm font-mono font-bold text-foreground">
                  8 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 text-xs font-mono rounded transition-colors",
        active
          ? "text-cyan bg-cyan/10"
          : "text-muted hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

function SummaryCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-surface-2 border border-border rounded-lg p-4">
      <div className="text-xxs font-mono text-muted mb-1">{label}</div>
      <div
        className={cn(
          "text-lg font-mono font-bold",
          valueColor || "text-foreground"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function BalancesSection() {
  const coins = [
    { coin: "USDC", total: "0.00", available: "0.00", usdcValue: "$0.00" },
    { coin: "SOL", total: "0.00", available: "0.00", usdcValue: "$0.00" },
    { coin: "BTC", total: "0.00", available: "0.00", usdcValue: "$0.00" },
    { coin: "ETH", total: "0.00", available: "0.00", usdcValue: "$0.00" },
  ];

  return (
    <div className="text-[11px] font-mono">
      <div className="flex items-center px-4 py-2 border-b border-border text-muted bg-surface-2/30">
        <span className="w-24">Asset</span>
        <span className="flex-1 text-right">Total Balance</span>
        <span className="flex-1 text-right">Available</span>
        <span className="flex-1 text-right">USD Value</span>
      </div>
      {coins.map((c) => (
        <div
          key={c.coin}
          className="flex items-center px-4 py-2.5 hover:bg-surface-2/20 text-foreground/70"
        >
          <span className="w-24 text-foreground font-bold">{c.coin}</span>
          <span className="flex-1 text-right">{c.total}</span>
          <span className="flex-1 text-right">{c.available}</span>
          <span className="flex-1 text-right">{c.usdcValue}</span>
        </div>
      ))}
    </div>
  );
}

function FundingSection() {
  const entries = [
    { time: "2026-02-08 12:00", market: "SOL-PERP", payment: "+$0.012", rate: "0.0100%" },
    { time: "2026-02-08 08:00", market: "SOL-PERP", payment: "+$0.008", rate: "0.0085%" },
    { time: "2026-02-08 04:00", market: "SOL-PERP", payment: "-$0.003", rate: "-0.0032%" },
    { time: "2026-02-08 00:00", market: "BTC-PERP", payment: "+$0.045", rate: "0.0100%" },
    { time: "2026-02-07 20:00", market: "SOL-PERP", payment: "+$0.011", rate: "0.0095%" },
  ];

  return (
    <div className="text-[11px] font-mono">
      <div className="flex items-center px-4 py-2 border-b border-border text-muted bg-surface-2/30">
        <span className="w-36">Time</span>
        <span className="w-24">Market</span>
        <span className="flex-1 text-right">Payment</span>
        <span className="flex-1 text-right">Rate</span>
      </div>
      {entries.map((e, i) => (
        <div
          key={i}
          className="flex items-center px-4 py-2.5 hover:bg-surface-2/20 text-foreground/70"
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
        </div>
      ))}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px] text-muted text-xs font-mono">
      {text}
    </div>
  );
}
