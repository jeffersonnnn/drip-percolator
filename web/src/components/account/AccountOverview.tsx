"use client";

import { useAccountStore } from "@/stores/useAccountStore";
import { useWallet } from "@solana/wallet-adapter-react";
import { cn } from "@/lib/utils";

export function AccountOverview() {
  const { connected } = useWallet();
  const { balance, equity, unrealizedPnl, marginUsed, availableMargin } =
    useAccountStore();

  if (!connected) {
    return (
      <div className="flex items-center justify-center h-full text-muted text-xs font-mono">
        Connect wallet to view account
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Balance" value={`$${balance.toFixed(2)}`} />
        <StatCard label="Equity" value={`$${equity.toFixed(2)}`} />
        <StatCard
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
        <StatCard label="Margin Used" value={`$${marginUsed.toFixed(2)}`} />
        <StatCard
          label="Available Margin"
          value={`$${availableMargin.toFixed(2)}`}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-surface-2 rounded-md p-3">
      <div className="text-xxs font-mono text-muted mb-1">{label}</div>
      <div className={cn("text-sm font-mono font-bold", valueColor || "text-foreground")}>
        {value}
      </div>
    </div>
  );
}
