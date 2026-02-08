import { create } from "zustand";

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface PriceData {
  price: number;
  confidence: number;
  timestamp: number;
  change24h: number;
  changePct24h: number;
}

interface PriceState {
  prices: Record<string, PriceData>;
  candles: Record<string, CandleData[]>;
  setPrice: (symbol: string, data: PriceData) => void;
  addCandle: (symbol: string, candle: CandleData) => void;
  setCandles: (symbol: string, candles: CandleData[]) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: {},
  candles: {},
  setPrice: (symbol, data) =>
    set((state) => ({
      prices: { ...state.prices, [symbol]: data },
    })),
  addCandle: (symbol, candle) =>
    set((state) => {
      const existing = state.candles[symbol] || [];
      const last = existing[existing.length - 1];
      if (last && last.time === candle.time) {
        const updated = [...existing];
        updated[updated.length - 1] = candle;
        return { candles: { ...state.candles, [symbol]: updated } };
      }
      return {
        candles: { ...state.candles, [symbol]: [...existing, candle] },
      };
    }),
  setCandles: (symbol, candles) =>
    set((state) => ({
      candles: { ...state.candles, [symbol]: candles },
    })),
}));
