"use client";

import { usePositionStore } from "@/stores/usePositionStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { useMarketStore } from "@/stores/useMarketStore";

export function usePositions() {
  const { positions } = usePositionStore();
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);

  // Re-derive PnL with latest price
  return positions.map((pos) => {
    if (!price) return pos;

    const isLong = pos.side === "long";
    const pnl = isLong
      ? (price.price - pos.entryPrice) * pos.size
      : (pos.entryPrice - price.price) * pos.size;

    const pnlPercent =
      pos.entryPrice > 0
        ? ((price.price - pos.entryPrice) / pos.entryPrice) *
          100 *
          (isLong ? 1 : -1)
        : 0;

    return {
      ...pos,
      markPrice: price.price,
      pnl,
      pnlPercent,
    };
  });
}
