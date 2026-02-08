import { create } from "zustand";

export type OrderSide = "long" | "short";
export type OrderType = "market" | "limit";

interface TradeState {
  side: OrderSide;
  orderType: OrderType;
  size: string;
  leverage: number;
  limitPrice: string;
  setSide: (side: OrderSide) => void;
  setOrderType: (type: OrderType) => void;
  setSize: (size: string) => void;
  setLeverage: (leverage: number) => void;
  setLimitPrice: (price: string) => void;
  reset: () => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  side: "long",
  orderType: "market",
  size: "",
  leverage: 5,
  limitPrice: "",
  setSide: (side) => set({ side }),
  setOrderType: (orderType) => set({ orderType }),
  setSize: (size) => set({ size }),
  setLeverage: (leverage) => set({ leverage }),
  setLimitPrice: (limitPrice) => set({ limitPrice }),
  reset: () =>
    set({ size: "", leverage: 5, limitPrice: "", orderType: "market" }),
}));
