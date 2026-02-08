"use client";

import { usePositionStore } from "@/stores/usePositionStore";
import { PositionRow } from "./PositionRow";

const COLUMNS = [
  "Market",
  "Side",
  "Size",
  "Entry Price",
  "Mark Price",
  "PnL",
  "Margin",
  "Lev.",
  "Liq. Price",
  "Funding",
  "ADL",
  "",
];

export function PositionsTable() {
  const { positions } = usePositionStore();

  if (positions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted text-xs font-mono">
        No open positions
      </div>
    );
  }

  return (
    <div className="text-[11px] font-mono">
      <div className="flex items-center px-3 py-1.5 border-b border-border text-muted bg-surface-2/30">
        {COLUMNS.map((col) => (
          <span key={col} className={col === "" ? "w-16" : "flex-1 text-right first:text-left"}>
            {col}
          </span>
        ))}
      </div>
      {positions.map((pos, i) => (
        <PositionRow key={i} position={pos} />
      ))}
      {/* PnL summary */}
      <div className="flex items-center px-3 py-1.5 border-t border-border bg-surface-2/20">
        <span className="flex-1 text-muted text-[10px]">Total Unrealized PnL</span>
        <span className="text-[10px] text-green tabular-nums">
          ${positions.reduce((sum, p) => sum + (p.pnl || 0), 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
