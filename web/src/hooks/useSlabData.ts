"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePercolator } from "./usePercolator";
import { useAccountStore } from "@/stores/useAccountStore";
import { usePositionStore, Position } from "@/stores/usePositionStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { useMarketStore } from "@/stores/useMarketStore";
import { MARGIN_SCALE, PRICE_SCALE, SIZE_SCALE } from "@/lib/percolator/constants";
import { calculatePnl, calculateLiquidationPrice } from "@/lib/percolator/math";

const POLL_INTERVAL = 2000;

export function useSlabData() {
  const { client, publicKey } = usePercolator();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const pollData = useCallback(async () => {
    if (!client || !publicKey) return;

    const accountStore = useAccountStore.getState();
    const positionStore = usePositionStore.getState();
    const priceState = usePriceStore.getState();
    const marketState = useMarketStore.getState();

    try {
      accountStore.setLoading(true);
      positionStore.setLoading(true);

      const account = await client.getUserAccount(publicKey);

      if (!account) {
        accountStore.setBalance(0);
        accountStore.setEquity(0);
        accountStore.setUnrealizedPnl(0);
        accountStore.setMarginUsed(0);
        accountStore.setAvailableMargin(0);
        positionStore.setPositions([]);
        return;
      }

      const collateral = Number(account.collateral) / MARGIN_SCALE;
      const selectedMarket = marketState.selectedMarket;

      const derivedPositions: Position[] = account.positions.map((pos) => {
        const isLong = pos.size > 0n;
        const size = Math.abs(Number(pos.size)) / SIZE_SCALE;
        const entryPrice = Number(pos.entryPrice) / PRICE_SCALE;
        const markPrice = priceState.prices[selectedMarket.symbol]?.price || entryPrice;

        const pnl = calculatePnl(entryPrice, markPrice, size, isLong);
        const notional = size * markPrice;
        const leverage = collateral > 0 ? notional / collateral : 1;
        const liqPrice = calculateLiquidationPrice(entryPrice, leverage, isLong);

        return {
          market: selectedMarket.id,
          side: isLong ? ("long" as const) : ("short" as const),
          size,
          entryPrice,
          markPrice,
          pnl,
          pnlPercent:
            entryPrice > 0
              ? ((markPrice - entryPrice) / entryPrice) * 100 * (isLong ? 1 : -1)
              : 0,
          liquidationPrice: liqPrice,
          margin: notional / leverage,
          leverage,
        };
      });

      const totalPnl = derivedPositions.reduce((sum, p) => sum + p.pnl, 0);
      const totalMargin = derivedPositions.reduce((sum, p) => sum + p.margin, 0);
      const equity = collateral + totalPnl;

      accountStore.setBalance(collateral);
      accountStore.setEquity(equity);
      accountStore.setUnrealizedPnl(totalPnl);
      accountStore.setMarginUsed(totalMargin);
      accountStore.setAvailableMargin(Math.max(0, equity - totalMargin));
      accountStore.setConnected(true);
      positionStore.setPositions(derivedPositions);
    } catch (err) {
      console.error("Slab poll error:", err);
    } finally {
      accountStore.setLoading(false);
      positionStore.setLoading(false);
    }
  }, [client, publicKey]);

  useEffect(() => {
    if (!client || !publicKey) {
      useAccountStore.getState().setConnected(false);
      return;
    }

    pollData();
    intervalRef.current = setInterval(pollData, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [client, publicKey, pollData]);
}
