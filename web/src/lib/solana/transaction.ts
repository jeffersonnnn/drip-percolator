import {
  Connection,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";

export interface SendTransactionResult {
  signature: string;
  confirmed: boolean;
  error?: string;
}

export async function buildTransaction(
  connection: Connection,
  instructions: TransactionInstruction[],
  feePayer: PublicKey
): Promise<Transaction> {
  const tx = new Transaction();
  tx.add(...instructions);

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  tx.lastValidBlockHeight = lastValidBlockHeight;
  tx.feePayer = feePayer;

  return tx;
}

export async function confirmTransaction(
  connection: Connection,
  signature: string
): Promise<boolean> {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  try {
    const result = await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );
    return !result.value.err;
  } catch {
    return false;
  }
}
