import { PYTH_HERMES_URL } from "@/config/rpc";
import { PYTH_FEED_IDS } from "@/lib/percolator/constants";

export interface PythPrice {
  price: number;
  confidence: number;
  expo: number;
  publishTime: number;
}

// REST fallback for initial price load
export async function fetchPythPrices(
  symbols: string[]
): Promise<Record<string, PythPrice>> {
  const feedIds = symbols
    .map((s) => PYTH_FEED_IDS[s])
    .filter(Boolean);

  if (feedIds.length === 0) return {};

  const params = feedIds.map((id) => `ids[]=${id}`).join("&");
  const url = `${PYTH_HERMES_URL}/v2/updates/price/latest?${params}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pyth fetch failed: ${res.status}`);

  const data = await res.json();
  const result: Record<string, PythPrice> = {};

  for (const parsed of data.parsed || []) {
    const symbol = Object.entries(PYTH_FEED_IDS).find(
      ([, feedId]) => feedId === `0x${parsed.id}`
    )?.[0];

    if (symbol && parsed.price) {
      const price = parsed.price;
      result[symbol] = {
        price: Number(price.price) * Math.pow(10, price.expo),
        confidence: Number(price.conf) * Math.pow(10, price.expo),
        expo: price.expo,
        publishTime: parsed.price.publish_time,
      };
    }
  }

  return result;
}

export type PythWsCallback = (symbol: string, price: PythPrice) => void;

export class PythWebSocketClient {
  private ws: WebSocket | null = null;
  private callback: PythWsCallback;
  private symbols: string[];
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(symbols: string[], callback: PythWsCallback) {
    this.symbols = symbols;
    this.callback = callback;
  }

  connect() {
    const wsUrl = PYTH_HERMES_URL.replace("https", "wss") + "/ws";
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      const feedIds = this.symbols
        .map((s) => PYTH_FEED_IDS[s])
        .filter(Boolean);

      this.ws?.send(
        JSON.stringify({
          type: "subscribe",
          ids: feedIds,
        })
      );
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "price_update" && data.price_feed) {
          const feed = data.price_feed;
          const symbol = Object.entries(PYTH_FEED_IDS).find(
            ([, feedId]) => feedId === `0x${feed.id}`
          )?.[0];

          if (symbol && feed.price) {
            this.callback(symbol, {
              price:
                Number(feed.price.price) * Math.pow(10, feed.price.expo),
              confidence:
                Number(feed.price.conf) * Math.pow(10, feed.price.expo),
              expo: feed.price.expo,
              publishTime: feed.price.publish_time,
            });
          }
        }
      } catch {
        // Ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 3000);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }
}
