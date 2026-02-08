"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { cn } from "@/lib/utils";

const STOPS = [1, 2, 5, 10, 20, 50];

export function LeverageSlider() {
  const { leverage, setLeverage } = useTradeStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xxs font-mono text-muted">Leverage</label>
        <span className="text-xs font-mono text-cyan font-bold">
          {leverage}x
        </span>
      </div>

      <input
        type="range"
        min={1}
        max={50}
        step={1}
        value={leverage}
        onChange={(e) => setLeverage(parseInt(e.target.value))}
        className="w-full h-1 bg-surface-3 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-cyan
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,212,255,0.4)]"
      />

      <div className="flex justify-between mt-2 gap-1">
        {STOPS.map((s) => (
          <button
            key={s}
            onClick={() => setLeverage(s)}
            className={cn(
              "flex-1 py-1 text-xxs font-mono rounded transition-colors",
              leverage === s
                ? "bg-surface-3 text-cyan border border-cyan/30"
                : "bg-surface-2 text-muted hover:text-foreground"
            )}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
