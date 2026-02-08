"use client";

import { useEffect, useRef } from "react";
import { usePriceStore, CandleData } from "@/stores/usePriceStore";
import { fetchPythPrices, PythWebSocketClient } from "@/lib/prices/pyth";

const SYMBOLS = ["SOL", "BTC", "ETH"];
const CANDLE_INTERVAL = 60;
const PRICE_THROTTLE_MS = 500; // Throttle price updates to avoid render storms

function generateSyntheticCandles(symbol: string, currentPrice: number) {
  const candles: CandleData[] = [];
  const now = Math.floor(Date.now() / 1000);
  const candleCount = 200;

  let price = currentPrice * (1 - 0.02 * Math.random());

  for (let i = candleCount; i >= 0; i--) {
    const time = now - i * 900;
    const volatility = currentPrice * 0.003;
    const open = price;
    const close = open + (Math.random() - 0.48) * volatility * 2;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;

    candles.push({
      time: time - (time % 900),
      open,
      high,
      low,
      close,
    });

    price = close;
  }

  usePriceStore.getState().setCandles(symbol, candles);
}

export function usePrices() {
  const wsRef = useRef<PythWebSocketClient | null>(null);
  const lastPricesRef = useRef<Record<string, number>>({});
  const lastUpdateRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // Fetch initial prices
    fetchPythPrices(SYMBOLS)
      .then((prices) => {
        const store = usePriceStore.getState();
        for (const [symbol, data] of Object.entries(prices)) {
          lastPricesRef.current[symbol] = data.price;
          store.setPrice(symbol, {
            price: data.price,
            confidence: data.confidence,
            timestamp: data.publishTime,
            change24h: 0,
            changePct24h: 0,
          });
          generateSyntheticCandles(symbol, data.price);
        }
      })
      .catch((err) => {
        console.warn("Pyth REST failed, using fallback:", err);
        const fallback: Record<string, number> = {
          SOL: 200,
          BTC: 95000,
          ETH: 3200,
        };
        const store = usePriceStore.getState();
        for (const symbol of SYMBOLS) {
          const price = fallback[symbol];
          lastPricesRef.current[symbol] = price;
          store.setPrice(symbol, {
            price,
            confidence: 0,
            timestamp: Date.now() / 1000,
            change24h: 0,
            changePct24h: 0,
          });
          generateSyntheticCandles(symbol, price);
        }
      });

    // WebSocket for live updates — throttled
    const ws = new PythWebSocketClient(SYMBOLS, (symbol, data) => {
      const now = Date.now();
      const lastUpdate = lastUpdateRef.current[symbol] || 0;
      if (now - lastUpdate < PRICE_THROTTLE_MS) return;
      lastUpdateRef.current[symbol] = now;

      const prevPrice = lastPricesRef.current[symbol] || data.price;
      const change = data.price - prevPrice;

      usePriceStore.getState().setPrice(symbol, {
        price: data.price,
        confidence: data.confidence,
        timestamp: data.publishTime,
        change24h: change,
        changePct24h: prevPrice > 0 ? (change / prevPrice) * 100 : 0,
      });

      const ts = Math.floor(Date.now() / 1000);
      const candleTime = ts - (ts % CANDLE_INTERVAL);

      usePriceStore.getState().addCandle(symbol, {
        time: candleTime,
        open: lastPricesRef.current[symbol] || data.price,
        high: data.price,
        low: data.price,
        close: data.price,
      });

      lastPricesRef.current[symbol] = data.price;
    });

    ws.connect();
    wsRef.current = ws;

    return () => {
      ws.disconnect();
      wsRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
