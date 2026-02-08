"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "deposit" | "withdraw";

export function DepositWithdraw() {
  const [mode, setMode] = useState<Mode>("deposit");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex bg-surface-2 rounded-md p-0.5">
        {(["deposit", "withdraw"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 py-1.5 text-xs font-mono capitalize rounded transition-colors",
              mode === m
                ? "bg-surface-3 text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div>
        <label className="text-xxs font-mono text-muted mb-1.5 block">
          Amount (USDC)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-cyan transition-colors"
        />
      </div>

      <button
        disabled={!amount || parseFloat(amount) <= 0}
        className={cn(
          "w-full py-2.5 rounded-md font-mono text-sm font-bold transition-all",
          mode === "deposit"
            ? "bg-green/10 text-green border border-green/30 hover:bg-green/20"
            : "bg-red/10 text-red border border-red/30 hover:bg-red/20",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        {mode === "deposit" ? "Deposit" : "Withdraw"}
      </button>
    </div>
  );
}
