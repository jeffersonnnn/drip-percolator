"use client";

import { useTradeStore, OrderType } from "@/stores/useTradeStore";
import { cn } from "@/lib/utils";

const types: OrderType[] = ["market", "limit"];

export function OrderTypeToggle() {
  const { orderType, setOrderType } = useTradeStore();

  return (
    <div className="flex bg-surface-2 rounded-md p-0.5">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setOrderType(type)}
          className={cn(
            "flex-1 py-1.5 text-xs font-mono capitalize rounded transition-colors",
            orderType === type
              ? "bg-surface-3 text-foreground"
              : "text-muted hover:text-foreground"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
