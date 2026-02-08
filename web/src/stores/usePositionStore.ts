import { create } from "zustand";

export interface Position {
  market: string;
  side: "long" | "short";
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercent: number;
  liquidationPrice: number;
  margin: number;
  leverage: number;
}

interface PositionState {
  positions: Position[];
  isLoading: boolean;
  setPositions: (positions: Position[]) => void;
  setLoading: (loading: boolean) => void;
}

export const usePositionStore = create<PositionState>((set) => ({
  positions: [],
  isLoading: false,
  setPositions: (positions) => set({ positions }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
