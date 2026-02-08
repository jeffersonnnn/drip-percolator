import { create } from "zustand";
import { MarketConfig, MARKETS, DEFAULT_MARKET } from "@/config/markets";

interface MarketState {
  selectedMarket: MarketConfig;
  markets: MarketConfig[];
  setSelectedMarket: (marketId: string) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  selectedMarket: DEFAULT_MARKET,
  markets: MARKETS,
  setSelectedMarket: (marketId) =>
    set({
      selectedMarket: MARKETS.find((m) => m.id === marketId) || DEFAULT_MARKET,
    }),
}));
