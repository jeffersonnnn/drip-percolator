import { TransactionInstruction } from "@solana/web3.js";
import { encodeU8, encodeU16, encodeU64, encodeI128 } from "./encode";
import { IX_TAGS, PERCOLATOR_PROGRAM_ID } from "./constants";
import { TradeParams } from "./types";
import {
  buildInitUserAccounts,
  buildDepositAccounts,
  buildWithdrawAccounts,
  buildTradeCpiAccounts,
  buildCrankAccounts,
  AccountsConfig,
} from "./accounts";

export function buildInitUserIx(config: AccountsConfig): TransactionInstruction {
  const data = Buffer.concat([encodeU8(IX_TAGS.INIT_USER)]);

  return new TransactionInstruction({
    programId: PERCOLATOR_PROGRAM_ID,
    keys: buildInitUserAccounts(config),
    data,
  });
}

export function buildDepositCollateralIx(
  config: AccountsConfig,
  amount: bigint
): TransactionInstruction {
  const data = Buffer.concat([
    encodeU8(IX_TAGS.DEPOSIT_COLLATERAL),
    encodeU64(amount),
  ]);

  return new TransactionInstruction({
    programId: PERCOLATOR_PROGRAM_ID,
    keys: buildDepositAccounts(config),
    data,
  });
}

export function buildWithdrawCollateralIx(
  config: AccountsConfig,
  amount: bigint
): TransactionInstruction {
  const data = Buffer.concat([
    encodeU8(IX_TAGS.WITHDRAW_COLLATERAL),
    encodeU64(amount),
  ]);

  return new TransactionInstruction({
    programId: PERCOLATOR_PROGRAM_ID,
    keys: buildWithdrawAccounts(config),
    data,
  });
}

export function buildTradeCpiIx(
  config: AccountsConfig,
  params: TradeParams
): TransactionInstruction {
  const data = Buffer.concat([
    encodeU8(IX_TAGS.TRADE_CPI),
    encodeU16(params.marketIndex),
    encodeI128(params.sizeDelta),
    encodeU8(params.isBuy ? 1 : 0),
    encodeU64(params.limitPrice),
  ]);

  return new TransactionInstruction({
    programId: PERCOLATOR_PROGRAM_ID,
    keys: buildTradeCpiAccounts(config),
    data,
  });
}

export function buildKeeperCrankIx(
  config: AccountsConfig
): TransactionInstruction {
  const data = Buffer.concat([encodeU8(IX_TAGS.KEEPER_CRANK)]);

  return new TransactionInstruction({
    programId: PERCOLATOR_PROGRAM_ID,
    keys: buildCrankAccounts(config),
    data,
  });
}
