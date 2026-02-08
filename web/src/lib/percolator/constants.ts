import { PublicKey } from "@solana/web3.js";

export const PERCOLATOR_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PERCOLATOR_PROGRAM_ID ||
    "11111111111111111111111111111111"
);

// Scale factors matching the Rust engine
export const PRICE_SCALE = 1_000_000; // 1e6 for price fixed-point
export const SIZE_SCALE = 1_000_000; // 1e6 for size fixed-point
export const MARGIN_SCALE = 1_000_000; // 1e6 for margin/collateral
export const FUNDING_SCALE = 1_000_000_000; // 1e9 for funding rate
export const PERCENT_SCALE = 10_000; // basis points

// Slab layout offsets
export const SLAB_HEADER_SIZE = 328;
export const ENGINE_OFFSET = 328;
export const BITMAP_OFFSET = 86520;
export const ACCOUNTS_OFFSET = 95256;
export const ACCOUNT_SIZE = 4096;
export const MAX_ACCOUNTS = 256;

// Instruction tags
export const IX_TAGS = {
  INIT_USER: 1,
  INIT_MARKET: 2,
  DEPOSIT_COLLATERAL: 3,
  WITHDRAW_COLLATERAL: 4,
  KEEPER_CRANK: 5,
  TRADE_NO_CPI: 6,
  SETTLE_FUNDING: 7,
  LIQUIDATE: 8,
  UPDATE_PARAMS: 9,
  TRADE_CPI: 10,
} as const;

// Token mints
export const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

// Pyth feed IDs
export const PYTH_FEED_IDS: Record<string, string> = {
  SOL: "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  BTC: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
};
