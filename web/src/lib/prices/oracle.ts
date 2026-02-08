import { fetchPythPrices } from "./pyth";

export interface OraclePrice {
  price: number;
  confidence: number;
  timestamp: number;
  source: "pyth";
}

export async function getOraclePrices(
  symbols: string[]
): Promise<Record<string, OraclePrice>> {
  const pythPrices = await fetchPythPrices(symbols);
  const result: Record<string, OraclePrice> = {};

  for (const [symbol, price] of Object.entries(pythPrices)) {
    result[symbol] = {
      price: price.price,
      confidence: price.confidence,
      timestamp: price.publishTime,
      source: "pyth",
    };
  }

  return result;
}
