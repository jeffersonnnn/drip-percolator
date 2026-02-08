"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";

export function SizeInput() {
  const { size, setSize, leverage } = useTradeStore();
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  const notional = size && price ? parseFloat(size) * price.price : 0;

  return (
    <div>
      <label className="text-xxs font-mono text-muted mb-1.5 block">
        Size ({selectedMarket.baseAsset})
      </label>
      <div className="relative">
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="0.00"
          step={selectedMarket.minSize}
          className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-cyan transition-colors pr-16"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xxs text-muted font-mono">
          {selectedMarket.baseAsset}
        </span>
      </div>
      {notional > 0 && (
        <div className="mt-1 text-xxs font-mono text-muted">
          ~${notional.toFixed(2)} USD | Margin: $
          {(notional / leverage).toFixed(2)}
        </div>
      )}
    </div>
  );
}
