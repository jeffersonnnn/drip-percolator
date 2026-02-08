import { PublicKey } from "@solana/web3.js";
import { PERCOLATOR_PROGRAM_ID } from "./constants";

export function deriveVaultAuthority(
  slabAddress: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault_authority"), slabAddress.toBuffer()],
    PERCOLATOR_PROGRAM_ID
  );
}

export function deriveLpPda(slabAddress: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("lp"), slabAddress.toBuffer()],
    PERCOLATOR_PROGRAM_ID
  );
}

export function deriveUserPda(
  slabAddress: PublicKey,
  userWallet: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("user"), slabAddress.toBuffer(), userWallet.toBuffer()],
    PERCOLATOR_PROGRAM_ID
  );
}
