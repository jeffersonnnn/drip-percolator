import { Connection, PublicKey } from "@solana/web3.js";
import {
  parseEngineState,
  parseAllAccounts,
  findAccountByOwner,
} from "./slab";
import { EngineState, PercolatorAccount } from "./types";
import { PRICE_SCALE, SIZE_SCALE, MARGIN_SCALE } from "./constants";

export class PercolatorClient {
  private connection: Connection;
  private slabAddress: PublicKey;
  private cachedData: Buffer | null = null;
  private lastFetch: number = 0;
  private cacheTtl: number = 2000; // 2s cache

  constructor(connection: Connection, slabAddress: PublicKey) {
    this.connection = connection;
    this.slabAddress = slabAddress;
  }

  async fetchSlabData(force: boolean = false): Promise<Buffer> {
    const now = Date.now();
    if (!force && this.cachedData && now - this.lastFetch < this.cacheTtl) {
      return this.cachedData;
    }

    const accountInfo = await this.connection.getAccountInfo(
      this.slabAddress,
      "confirmed"
    );

    if (!accountInfo || !accountInfo.data) {
      throw new Error("Slab account not found");
    }

    this.cachedData = Buffer.from(accountInfo.data);
    this.lastFetch = now;
    return this.cachedData;
  }

  async getEngineState(): Promise<EngineState> {
    const data = await this.fetchSlabData();
    return parseEngineState(data);
  }

  async getUserAccount(owner: PublicKey): Promise<PercolatorAccount | null> {
    const data = await this.fetchSlabData();
    return findAccountByOwner(data, owner);
  }

  async getAllAccounts(): Promise<PercolatorAccount[]> {
    const data = await this.fetchSlabData();
    return parseAllAccounts(data);
  }

  getSlabAddress(): PublicKey {
    return this.slabAddress;
  }

  getConnection(): Connection {
    return this.connection;
  }

  // Format engine state values for display
  static formatEngineState(engine: EngineState) {
    return {
      totalCollateral: Number(engine.totalCollateral) / MARGIN_SCALE,
      totalLongOi: Number(engine.totalLongOi) / SIZE_SCALE,
      totalShortOi: Number(engine.totalShortOi) / SIZE_SCALE,
      markPrice: Number(engine.markPrice) / PRICE_SCALE,
      indexPrice: Number(engine.indexPrice) / PRICE_SCALE,
      fundingRateLong: Number(engine.fundingRateLong) / 1e9,
      fundingRateShort: Number(engine.fundingRateShort) / 1e9,
    };
  }
}
