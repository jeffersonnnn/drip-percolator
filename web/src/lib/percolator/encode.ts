// Binary encoding utils — little-endian, matching Rust struct layout

export function encodeU8(val: number): Buffer {
  const buf = Buffer.alloc(1);
  buf.writeUInt8(val, 0);
  return buf;
}

export function encodeU16(val: number): Buffer {
  const buf = Buffer.alloc(2);
  buf.writeUInt16LE(val, 0);
  return buf;
}

export function encodeU32(val: number): Buffer {
  const buf = Buffer.alloc(4);
  buf.writeUInt32LE(val, 0);
  return buf;
}

export function encodeU64(val: bigint): Buffer {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(val, 0);
  return buf;
}

export function encodeI64(val: bigint): Buffer {
  const buf = Buffer.alloc(8);
  buf.writeBigInt64LE(val, 0);
  return buf;
}

export function encodeU128(val: bigint): Buffer {
  const buf = Buffer.alloc(16);
  buf.writeBigUInt64LE(val & BigInt("0xFFFFFFFFFFFFFFFF"), 0);
  buf.writeBigUInt64LE(val >> 64n, 8);
  return buf;
}

export function encodeI128(val: bigint): Buffer {
  const buf = Buffer.alloc(16);
  // For signed, handle two's complement
  const unsigned =
    val < 0n ? (1n << 128n) + val : val;
  buf.writeBigUInt64LE(unsigned & BigInt("0xFFFFFFFFFFFFFFFF"), 0);
  buf.writeBigUInt64LE((unsigned >> 64n) & BigInt("0xFFFFFFFFFFFFFFFF"), 8);
  return buf;
}

// Decoders
export function readU8(buf: Buffer, offset: number): number {
  return buf.readUInt8(offset);
}

export function readU16(buf: Buffer, offset: number): number {
  return buf.readUInt16LE(offset);
}

export function readU32(buf: Buffer, offset: number): number {
  return buf.readUInt32LE(offset);
}

export function readU64(buf: Buffer, offset: number): bigint {
  return buf.readBigUInt64LE(offset);
}

export function readI64(buf: Buffer, offset: number): bigint {
  return buf.readBigInt64LE(offset);
}

export function readU128(buf: Buffer, offset: number): bigint {
  const lo = buf.readBigUInt64LE(offset);
  const hi = buf.readBigUInt64LE(offset + 8);
  return (hi << 64n) | lo;
}

export function readI128(buf: Buffer, offset: number): bigint {
  const lo = buf.readBigUInt64LE(offset);
  const hi = buf.readBigInt64LE(offset + 8);
  return (hi << 64n) | lo;
}

export function readPubkey(buf: Buffer, offset: number): Uint8Array {
  return buf.subarray(offset, offset + 32);
}
