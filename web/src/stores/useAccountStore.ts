import { create } from "zustand";

interface AccountState {
  balance: number;
  equity: number;
  unrealizedPnl: number;
  marginUsed: number;
  availableMargin: number;
  isLoading: boolean;
  connected: boolean;
  setBalance: (balance: number) => void;
  setEquity: (equity: number) => void;
  setUnrealizedPnl: (pnl: number) => void;
  setMarginUsed: (margin: number) => void;
  setAvailableMargin: (margin: number) => void;
  setLoading: (loading: boolean) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  balance: 0,
  equity: 0,
  unrealizedPnl: 0,
  marginUsed: 0,
  availableMargin: 0,
  isLoading: false,
  connected: false,
  setBalance: (balance) => set({ balance }),
  setEquity: (equity) => set({ equity }),
  setUnrealizedPnl: (pnl) => set({ unrealizedPnl: pnl }),
  setMarginUsed: (margin) => set({ marginUsed: margin }),
  setAvailableMargin: (margin) => set({ availableMargin: margin }),
  setLoading: (loading) => set({ isLoading: loading }),
  setConnected: (connected) => set({ connected }),
  reset: () =>
    set({
      balance: 0,
      equity: 0,
      unrealizedPnl: 0,
      marginUsed: 0,
      availableMargin: 0,
      connected: false,
    }),
}));
