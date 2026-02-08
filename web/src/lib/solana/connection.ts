import { Connection, Commitment } from "@solana/web3.js";
import { RPC_ENDPOINTS } from "@/config/rpc";

let connection: Connection | null = null;

export function getConnection(commitment: Commitment = "confirmed"): Connection {
  if (!connection) {
    connection = new Connection(RPC_ENDPOINTS[0], {
      commitment,
      wsEndpoint: RPC_ENDPOINTS[0].replace("https", "wss"),
    });
  }
  return connection;
}

export async function getConnectionWithFallback(
  commitment: Commitment = "confirmed"
): Promise<Connection> {
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const conn = new Connection(endpoint, { commitment });
      await conn.getLatestBlockhash();
      return conn;
    } catch {
      continue;
    }
  }
  throw new Error("All RPC endpoints failed");
}
