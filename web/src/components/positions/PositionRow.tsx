"use client";

import { Position } from "@/stores/usePositionStore";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useTrading } from "@/hooks/useTrading";

export function PositionRow({ position }: { position: Position }) {
  const isLong = position.side === "long";
  const isProfitable = position.pnl >= 0;
  const { closePosition, isSubmitting } = useTrading();

  const handleClose = async () => {
    const result = await closePosition(position.size, isLong);
    if (!result.success) {
      console.error("Close failed:", result.error);
    }
  };

  return (
    <tr className="border-t border-border/50 hover:bg-surface-2/50 transition-colors">
      <td className="px-4 py-2.5 text-foreground">{position.market}</td>
      <td className={cn("px-4 py-2.5", isLong ? "text-green" : "text-red")}>
        {position.side.toUpperCase()}
      </td>
      <td className="px-4 py-2.5 text-foreground">
        {position.size.toFixed(4)}
      </td>
      <td className="px-4 py-2.5 text-foreground">
        ${position.entryPrice.toFixed(2)}
      </td>
      <td className="px-4 py-2.5 text-foreground">
        ${position.markPrice.toFixed(2)}
      </td>
      <td
        className={cn("px-4 py-2.5", isProfitable ? "text-green" : "text-red")}
      >
        {isProfitable ? "+" : ""}${position.pnl.toFixed(2)}
        <span className="text-xxs ml-1">
          ({isProfitable ? "+" : ""}
          {position.pnlPercent.toFixed(2)}%)
        </span>
      </td>
      <td className="px-4 py-2.5 text-muted">
        ${position.liquidationPrice.toFixed(2)}
      </td>
      <td className="px-4 py-2.5">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="p-1 rounded hover:bg-red/20 text-muted hover:text-red transition-colors disabled:opacity-40"
        >
          <X size={14} />
        </button>
      </td>
    </tr>
  );
}
