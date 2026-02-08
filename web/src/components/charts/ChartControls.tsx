"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const timeframes = ["1m", "5m", "15m", "30m", "1h", "4h", "12h", "1D", "1W"] as const;

export function ChartControls() {
  const [selected, setSelected] = useState<string>("15m");
  const [showIndicators, setShowIndicators] = useState(false);

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-border justify-between">
      <div className="flex items-center gap-0.5">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelected(tf)}
            className={cn(
              "px-2 py-1 text-xxs font-mono rounded transition-colors",
              selected === tf
                ? "bg-surface-3 text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {tf}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowIndicators(!showIndicators)}
          className={cn(
            "px-2 py-1 text-xxs font-mono rounded transition-colors",
            showIndicators ? "bg-cyan/10 text-cyan" : "text-muted hover:text-foreground"
          )}
          title="Indicators"
        >
          fx
        </button>
        <button
          className="px-2 py-1 text-xxs font-mono text-muted hover:text-foreground rounded transition-colors"
          title="Chart settings"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      </div>
    </div>
  );
}
