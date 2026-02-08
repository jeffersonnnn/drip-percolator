import { PublicKey } from "@solana/web3.js";
import {
  readU8,
  readU16,
  readU64,
  readI64,
  readI128,
  readPubkey,
} from "./encode";
import {
  ENGINE_OFFSET,
  BITMAP_OFFSET,
  ACCOUNTS_OFFSET,
  ACCOUNT_SIZE,
  MAX_ACCOUNTS,
  PRICE_SCALE,
} from "./constants";
import {
  EngineState,
  PercolatorAccount,
  AccountKind,
  UserPosition,
} from "./types";

export function parseEngineState(data: Buffer): EngineState {
  const off = ENGINE_OFFSET;

  return {
    isInitialized: readU8(data, off) === 1,
    authority: new PublicKey(readPubkey(data, off + 1)),
    totalCollateral: readU64(data, off + 33),
    totalLongOi: readU64(data, off + 41),
    totalShortOi: readU64(data, off + 49),
    fundingRateLong: readI64(data, off + 57),
    fundingRateShort: readI64(data, off + 65),
    lastFundingTime: readI64(data, off + 73),
    markPrice: readU64(data, off + 81),
    indexPrice: readU64(data, off + 89),
    maxLeverage: readU16(data, off + 97),
    maintenanceMarginRatio: readU16(data, off + 99),
    takerFeeRate: readU16(data, off + 101),
    makerFeeRate: readU16(data, off + 103),
  };
}

export function parseBitmap(data: Buffer): boolean[] {
  const bitmap: boolean[] = [];
  for (let i = 0; i < MAX_ACCOUNTS; i++) {
    const byteIndex = BITMAP_OFFSET + Math.floor(i / 8);
    const bitIndex = i % 8;
    bitmap.push((readU8(data, byteIndex) & (1 << bitIndex)) !== 0);
  }
  return bitmap;
}

export function parseAccount(
  data: Buffer,
  index: number
): PercolatorAccount | null {
  const off = ACCOUNTS_OFFSET + index * ACCOUNT_SIZE;

  if (off + ACCOUNT_SIZE > data.length) return null;

  const kind = readU8(data, off) as AccountKind;
  if (kind === AccountKind.Uninitialized) return null;

  const owner = new PublicKey(readPubkey(data, off + 1));
  const collateral = readU64(data, off + 33);

  // Parse positions (up to 8 per account)
  const positionCount = readU8(data, off + 41);
  const positions: UserPosition[] = [];
  const posStart = off + 42;
  const POS_SIZE = 64; // each position struct

  for (let i = 0; i < Math.min(positionCount, 8); i++) {
    const pOff = posStart + i * POS_SIZE;
    const size = readI128(data, pOff);
    if (size === 0n) continue;

    positions.push({
      size,
      entryPrice: readU64(data, pOff + 16),
      lastFundingIndex: readI64(data, pOff + 24),
      realizedPnl: readI128(data, pOff + 32),
    });
  }

  return {
    kind,
    owner,
    collateral,
    positions,
    accountIndex: index,
  };
}

export function parseAllAccounts(data: Buffer): PercolatorAccount[] {
  const bitmap = parseBitmap(data);
  const accounts: PercolatorAccount[] = [];

  for (let i = 0; i < MAX_ACCOUNTS; i++) {
    if (!bitmap[i]) continue;
    const account = parseAccount(data, i);
    if (account) accounts.push(account);
  }

  return accounts;
}

export function findAccountByOwner(
  data: Buffer,
  owner: PublicKey
): PercolatorAccount | null {
  const accounts = parseAllAccounts(data);
  return (
    accounts.find((a) => a.owner.equals(owner)) || null
  );
}

export function getMarkPrice(data: Buffer): number {
  const engine = parseEngineState(data);
  return Number(engine.markPrice) / PRICE_SCALE;
}
