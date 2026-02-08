"use client";

import { useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMarketStore } from "@/stores/useMarketStore";
import { useTradeStore } from "@/stores/useTradeStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { buildTradeCpiIx } from "@/lib/percolator/instructions";
import { deriveVaultAuthority, deriveLpPda } from "@/lib/percolator/pda";
import { toRawAmount, toRawPrice } from "@/lib/percolator/math";
import { SIZE_SCALE } from "@/lib/percolator/constants";
import { buildTransaction, confirmTransaction } from "@/lib/solana/transaction";
import { TradeParams } from "@/lib/percolator/types";

export interface TradeResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export function useTrading() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { selectedMarket } = useMarketStore();
  const { side, orderType, size, limitPrice, reset } =
    useTradeStore();
  const prices = usePriceStore((s) => s.prices);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executeTrade = useCallback(async (): Promise<TradeResult> => {
    if (!publicKey || !sendTransaction) {
      return { success: false, error: "Wallet not connected" };
    }

    const sizeNum = parseFloat(size);
    if (!sizeNum || sizeNum <= 0) {
      return { success: false, error: "Invalid size" };
    }

    const slabAddress = selectedMarket.slabAddress;
    if (!slabAddress) {
      return { success: false, error: "Market slab address not configured" };
    }

    setIsSubmitting(true);

    try {
      const slabPubkey = new PublicKey(slabAddress);
      const [vaultAuthority] = deriveVaultAuthority(slabPubkey);
      const [lpPda] = deriveLpPda(slabPubkey);

      const isBuy = side === "long";
      const currentPrice = prices[selectedMarket.symbol]?.price || 0;
      const tradeLimitPrice =
        orderType === "limit" && limitPrice
          ? parseFloat(limitPrice)
          : isBuy
            ? currentPrice * 1.05 // 5% slippage for market orders
            : currentPrice * 0.95;

      const params: TradeParams = {
        marketIndex: 0,
        sizeDelta: toRawAmount(sizeNum, SIZE_SCALE),
        isBuy,
        limitPrice: toRawPrice(tradeLimitPrice),
      };

      const ix = buildTradeCpiIx(
        {
          slab: slabPubkey,
          user: publicKey,
          vaultAuthority,
          vaultToken: vaultAuthority, // placeholder
          userToken: publicKey, // placeholder
          lpPda,
          oracle: PublicKey.default, // placeholder oracle
        },
        params
      );

      const tx = await buildTransaction(connection, [ix], publicKey);
      const signature = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });

      const confirmed = await confirmTransaction(connection, signature);

      if (confirmed) {
        reset();
        return { success: true, signature };
      }

      return {
        success: false,
        signature,
        error: "Transaction not confirmed",
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Transaction failed";
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  }, [
    publicKey,
    sendTransaction,
    connection,
    size,
    side,
    orderType,
    limitPrice,
    selectedMarket,
    prices,
    reset,
  ]);

  const closePosition = useCallback(
    async (
      positionSize: number,
      isLong: boolean
    ): Promise<TradeResult> => {
      if (!publicKey || !sendTransaction) {
        return { success: false, error: "Wallet not connected" };
      }

      const slabAddress = selectedMarket.slabAddress;
      if (!slabAddress) {
        return { success: false, error: "Market slab address not configured" };
      }

      setIsSubmitting(true);

      try {
        const slabPubkey = new PublicKey(slabAddress);
        const [vaultAuthority] = deriveVaultAuthority(slabPubkey);
        const [lpPda] = deriveLpPda(slabPubkey);

        const currentPrice =
          prices[selectedMarket.symbol]?.price || 0;
        const closeLimitPrice = isLong
          ? currentPrice * 0.95
          : currentPrice * 1.05;

        const params: TradeParams = {
          marketIndex: 0,
          sizeDelta: toRawAmount(positionSize, SIZE_SCALE),
          isBuy: !isLong, // opposite side to close
          limitPrice: toRawPrice(closeLimitPrice),
        };

        const ix = buildTradeCpiIx(
          {
            slab: slabPubkey,
            user: publicKey,
            vaultAuthority,
            vaultToken: vaultAuthority,
            userToken: publicKey,
            lpPda,
            oracle: PublicKey.default,
          },
          params
        );

        const tx = await buildTransaction(connection, [ix], publicKey);
        const signature = await sendTransaction(tx, connection, {
          skipPreflight: true,
        });

        const confirmed = await confirmTransaction(connection, signature);

        return confirmed
          ? { success: true, signature }
          : { success: false, signature, error: "Transaction not confirmed" };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Close position failed";
        return { success: false, error: message };
      } finally {
        setIsSubmitting(false);
      }
    },
    [publicKey, sendTransaction, connection, selectedMarket, prices]
  );

  return { executeTrade, closePosition, isSubmitting };
}
