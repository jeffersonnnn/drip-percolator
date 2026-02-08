import { PublicKey } from "@solana/web3.js";

export enum AccountKind {
  Uninitialized = 0,
  User = 1,
  LiquidityProvider = 2,
}

export interface EngineState {
  isInitialized: boolean;
  authority: PublicKey;
  totalCollateral: bigint;
  totalLongOi: bigint;
  totalShortOi: bigint;
  fundingRateLong: bigint;
  fundingRateShort: bigint;
  lastFundingTime: bigint;
  markPrice: bigint;
  indexPrice: bigint;
  maxLeverage: number;
  maintenanceMarginRatio: number;
  takerFeeRate: number;
  makerFeeRate: number;
}

export interface UserPosition {
  size: bigint; // positive = long, negative = short
  entryPrice: bigint;
  lastFundingIndex: bigint;
  realizedPnl: bigint;
}

export interface PercolatorAccount {
  kind: AccountKind;
  owner: PublicKey;
  collateral: bigint;
  positions: UserPosition[];
  accountIndex: number;
}

export interface RiskParams {
  maxLeverage: number;
  maintenanceMarginRatio: number;
  liquidationFeeRate: number;
  takerFeeRate: number;
  makerFeeRate: number;
}

export interface MarketState {
  longOi: bigint;
  shortOi: bigint;
  fundingRateLong: bigint;
  fundingRateShort: bigint;
  markPrice: bigint;
  indexPrice: bigint;
}

export interface TradeParams {
  marketIndex: number;
  sizeDelta: bigint; // positive = increase, negative = decrease
  isBuy: boolean;
  limitPrice: bigint;
}
