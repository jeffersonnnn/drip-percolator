"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { cn } from "@/lib/utils";

interface TradeConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TradeConfirmDialog({
  open,
  onConfirm,
  onCancel,
  isSubmitting,
}: TradeConfirmDialogProps) {
  const { side, orderType, size, leverage, limitPrice } = useTradeStore();
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  if (!open) return null;

  const sizeNum = parseFloat(size) || 0;
  const currentPrice = price?.price || 0;
  const notional = sizeNum * currentPrice;
  const margin = notional / leverage;
  const isLong = side === "long";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-lg p-6 w-[380px] shadow-2xl">
        <h3 className="text-sm font-mono font-bold text-foreground mb-4">
          Confirm Trade
        </h3>

        <div className="space-y-3 mb-6">
          <Row label="Market" value={selectedMarket.name} />
          <Row
            label="Side"
            value={side.toUpperCase()}
            valueColor={isLong ? "text-green" : "text-red"}
          />
          <Row label="Type" value={orderType.toUpperCase()} />
          <Row
            label="Size"
            value={`${sizeNum} ${selectedMarket.baseAsset}`}
          />
          <Row label="Leverage" value={`${leverage}x`} />
          {orderType === "limit" && limitPrice && (
            <Row label="Limit Price" value={`$${limitPrice}`} />
          )}
          <div className="border-t border-border pt-3">
            <Row label="Est. Notional" value={`$${notional.toFixed(2)}`} />
            <Row label="Est. Margin" value={`$${margin.toFixed(2)}`} />
            <Row
              label="Est. Fee"
              value={`$${(notional * 0.001).toFixed(2)}`}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-md text-xs font-mono bg-surface-2 text-muted hover:text-foreground border border-border transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={cn(
              "flex-1 py-2.5 rounded-md text-xs font-mono font-bold transition-all",
              isLong
                ? "bg-green/10 text-green border border-green/30 hover:bg-green/20"
                : "bg-red/10 text-red border border-red/30 hover:bg-red/20",
              "disabled:opacity-40"
            )}
          >
            {isSubmitting ? "Submitting..." : `Confirm ${side.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xxs font-mono text-muted">{label}</span>
      <span
        className={cn("text-xs font-mono", valueColor || "text-foreground")}
      >
        {value}
      </span>
    </div>
  );
}
