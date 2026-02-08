import { AccountMeta, PublicKey, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "./constants-token";

export interface AccountsConfig {
  slab: PublicKey;
  user: PublicKey;
  vaultAuthority: PublicKey;
  vaultToken: PublicKey;
  userToken: PublicKey;
  lpPda: PublicKey;
  oracle: PublicKey;
}

function writable(pubkey: PublicKey): AccountMeta {
  return { pubkey, isSigner: false, isWritable: true };
}

function readonly(pubkey: PublicKey): AccountMeta {
  return { pubkey, isSigner: false, isWritable: false };
}

function signer(pubkey: PublicKey): AccountMeta {
  return { pubkey, isSigner: true, isWritable: true };
}

export function buildInitUserAccounts(config: AccountsConfig): AccountMeta[] {
  return [
    writable(config.slab),
    signer(config.user),
    readonly(SystemProgram.programId),
  ];
}

export function buildDepositAccounts(config: AccountsConfig): AccountMeta[] {
  return [
    writable(config.slab),
    signer(config.user),
    writable(config.userToken),
    writable(config.vaultToken),
    readonly(config.vaultAuthority),
    readonly(TOKEN_PROGRAM_ID),
  ];
}

export function buildWithdrawAccounts(config: AccountsConfig): AccountMeta[] {
  return [
    writable(config.slab),
    signer(config.user),
    writable(config.userToken),
    writable(config.vaultToken),
    readonly(config.vaultAuthority),
    readonly(TOKEN_PROGRAM_ID),
  ];
}

export function buildTradeCpiAccounts(config: AccountsConfig): AccountMeta[] {
  return [
    writable(config.slab),
    signer(config.user),
    readonly(config.lpPda),
    readonly(config.oracle),
  ];
}

export function buildCrankAccounts(config: AccountsConfig): AccountMeta[] {
  return [
    writable(config.slab),
    signer(config.user),
    readonly(config.oracle),
  ];
}
