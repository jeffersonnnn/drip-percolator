import { PRICE_SCALE, SIZE_SCALE, MARGIN_SCALE, PERCENT_SCALE } from "./constants";

export function formatAmount(raw: bigint, scale: number = SIZE_SCALE): number {
  return Number(raw) / scale;
}

export function formatPrice(raw: bigint): number {
  return Number(raw) / PRICE_SCALE;
}

export function toRawAmount(amount: number, scale: number = SIZE_SCALE): bigint {
  return BigInt(Math.round(amount * scale));
}

export function toRawPrice(price: number): bigint {
  return BigInt(Math.round(price * PRICE_SCALE));
}

export function formatPnl(raw: bigint): number {
  return Number(raw) / MARGIN_SCALE;
}

export function calculatePnl(
  entryPrice: number,
  markPrice: number,
  size: number,
  isLong: boolean
): number {
  if (isLong) {
    return (markPrice - entryPrice) * Math.abs(size);
  }
  return (entryPrice - markPrice) * Math.abs(size);
}

export function calculateEquity(
  collateral: number,
  unrealizedPnl: number
): number {
  return collateral + unrealizedPnl;
}

export function calculateMarginRatio(
  equity: number,
  notionalValue: number
): number {
  if (notionalValue === 0) return Infinity;
  return equity / notionalValue;
}

export function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  isLong: boolean,
  maintenanceMarginRatio: number = 0.05
): number {
  const marginFraction = 1 / leverage;
  const buffer = marginFraction - maintenanceMarginRatio;

  if (isLong) {
    return entryPrice * (1 - buffer);
  }
  return entryPrice * (1 + buffer);
}

export function formatUsd(value: number, precision: number = 2): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(precision)}`;
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function bpsToPercent(bps: number): number {
  return bps / PERCENT_SCALE;
}
