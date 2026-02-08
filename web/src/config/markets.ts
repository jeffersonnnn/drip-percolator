export interface MarketConfig {
  id: string;
  name: string;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  pricePrecision: number;
  sizePrecision: number;
  minSize: number;
  maxLeverage: number;
  pythFeedId: string;
  slabAddress?: string;
  category: "major" | "meme" | "defi";
}

export const MARKETS: MarketConfig[] = [
  {
    id: "SOL-PERP",
    name: "SOL-PERP",
    symbol: "SOL",
    baseAsset: "SOL",
    quoteAsset: "USD",
    pricePrecision: 2,
    sizePrecision: 2,
    minSize: 0.01,
    maxLeverage: 50,
    pythFeedId:
      "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    slabAddress: process.env.NEXT_PUBLIC_SLAB_ADDRESS_SOL || "",
    category: "major",
  },
  {
    id: "BTC-PERP",
    name: "BTC-PERP",
    symbol: "BTC",
    baseAsset: "BTC",
    quoteAsset: "USD",
    pricePrecision: 1,
    sizePrecision: 5,
    minSize: 0.00001,
    maxLeverage: 50,
    pythFeedId:
      "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    category: "major",
  },
  {
    id: "ETH-PERP",
    name: "ETH-PERP",
    symbol: "ETH",
    baseAsset: "ETH",
    quoteAsset: "USD",
    pricePrecision: 2,
    sizePrecision: 4,
    minSize: 0.0001,
    maxLeverage: 50,
    pythFeedId:
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    category: "major",
  },
  {
    id: "WIF-PERP",
    name: "WIF-PERP",
    symbol: "WIF",
    baseAsset: "WIF",
    quoteAsset: "USD",
    pricePrecision: 4,
    sizePrecision: 1,
    minSize: 0.1,
    maxLeverage: 20,
    pythFeedId:
      "0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc",
    category: "meme",
  },
  {
    id: "BONK-PERP",
    name: "BONK-PERP",
    symbol: "BONK",
    baseAsset: "BONK",
    quoteAsset: "USD",
    pricePrecision: 8,
    sizePrecision: 0,
    minSize: 1000,
    maxLeverage: 10,
    pythFeedId:
      "0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419",
    category: "meme",
  },
  {
    id: "JUP-PERP",
    name: "JUP-PERP",
    symbol: "JUP",
    baseAsset: "JUP",
    quoteAsset: "USD",
    pricePrecision: 4,
    sizePrecision: 1,
    minSize: 0.1,
    maxLeverage: 20,
    pythFeedId:
      "0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996",
    category: "defi",
  },
  {
    id: "PYTH-PERP",
    name: "PYTH-PERP",
    symbol: "PYTH",
    baseAsset: "PYTH",
    quoteAsset: "USD",
    pricePrecision: 4,
    sizePrecision: 1,
    minSize: 1,
    maxLeverage: 20,
    pythFeedId:
      "0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff",
    category: "defi",
  },
  {
    id: "RNDR-PERP",
    name: "RNDR-PERP",
    symbol: "RNDR",
    baseAsset: "RNDR",
    quoteAsset: "USD",
    pricePrecision: 3,
    sizePrecision: 2,
    minSize: 0.1,
    maxLeverage: 20,
    pythFeedId:
      "0xab7347771135fc733f8f38db462ba085ed3309955f42554a14fa13e855ac0e2d",
    category: "defi",
  },
  {
    id: "FARTCOIN-PERP",
    name: "FARTCOIN-PERP",
    symbol: "FARTCOIN",
    baseAsset: "FARTCOIN",
    quoteAsset: "USD",
    pricePrecision: 4,
    sizePrecision: 0,
    minSize: 1,
    maxLeverage: 10,
    pythFeedId:
      "0x58cd29ef0e714e5b95683e2ca07ae5ac0e51b3b08596e92e78e7277903c994c3",
    category: "meme",
  },
  {
    id: "PENGU-PERP",
    name: "PENGU-PERP",
    symbol: "PENGU",
    baseAsset: "PENGU",
    quoteAsset: "USD",
    pricePrecision: 6,
    sizePrecision: 0,
    minSize: 100,
    maxLeverage: 10,
    pythFeedId:
      "0x0b1e3297e643c4b82aeefbf3c0b3a13e25f659fb1a24e2e10a4c23053a6aa41e",
    category: "meme",
  },
  {
    id: "AI16Z-PERP",
    name: "AI16Z-PERP",
    symbol: "AI16Z",
    baseAsset: "AI16Z",
    quoteAsset: "USD",
    pricePrecision: 4,
    sizePrecision: 1,
    minSize: 1,
    maxLeverage: 10,
    pythFeedId:
      "0xd41c2ba3aa2b4cbe38a33a89cf2c6e2be0bfccde08eb3caab0f468e82e8b540a",
    category: "meme",
  },
];

export const DEFAULT_MARKET = MARKETS[0];
