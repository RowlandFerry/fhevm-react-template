/**
 * Decryption utilities for FHEVM
 *
 * Provides functions to decrypt encrypted values from FHEVM smart contracts.
 */

import type { FhevmInstance } from 'fhevmjs';
import type { Signer } from 'ethers';

export interface DecryptionOptions {
  contractAddress: string;
  userAddress: string;
}

/**
 * Decrypt a boolean value using user's private key (userDecrypt)
 *
 * @param instance - FHEVM instance
 * @param handle - Encrypted handle from contract
 * @param signer - Ethers signer for EIP-712 signature
 * @param options - Decryption options
 * @returns Decrypted boolean value
 *
 * @example
 * ```typescript
 * const decrypted = await decryptBool(
 *   fhevmInstance,
 *   encryptedHandle,
 *   signer,
 *   { contractAddress: '0x...', userAddress: '0x...' }
 * );
 * ```
 */
export async function decryptBool(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<boolean> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Decrypt an 8-bit unsigned integer
 */
export async function decryptU8(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<number> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Decrypt a 16-bit unsigned integer
 */
export async function decryptU16(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<number> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Decrypt a 32-bit unsigned integer
 */
export async function decryptU32(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<number> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Decrypt a 64-bit unsigned integer
 */
export async function decryptU64(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<bigint> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Decrypt an Ethereum address
 */
export async function decryptAddress(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<string> {
  const { signature, publicKey } = await generateDecryptionSignature(
    instance,
    handle,
    signer,
    options
  );

  return instance.decrypt(options.contractAddress, handle);
}

/**
 * Generate EIP-712 signature for decryption (userDecrypt flow)
 *
 * @param instance - FHEVM instance
 * @param handle - Encrypted handle
 * @param signer - Ethers signer
 * @param options - Decryption options
 * @returns Signature and public key for decryption
 */
export async function generateDecryptionSignature(
  instance: FhevmInstance,
  handle: bigint,
  signer: Signer,
  options: DecryptionOptions
): Promise<{ signature: string; publicKey: string }> {
  // Get EIP-712 typed data for signing
  const eip712 = instance.generatePublicKeySignature(
    options.contractAddress,
    options.userAddress
  );

  // Sign with user's private key
  const signature = await signer.signTypedData(
    eip712.domain,
    { Reencrypt: eip712.types.Reencrypt },
    eip712.message
  );

  return {
    signature,
    publicKey: instance.getPublicKey(options.contractAddress) || '',
  };
}

/**
 * Public decrypt function (publicDecrypt - no signature required)
 *
 * Used for publicly accessible encrypted values.
 *
 * @example
 * ```typescript
 * const publicValue = await publicDecrypt(
 *   fhevmInstance,
 *   publicHandle,
 *   contractAddress
 * );
 * ```
 */
export async function publicDecrypt(
  instance: FhevmInstance,
  handle: bigint,
  contractAddress: string
): Promise<any> {
  return instance.decrypt(contractAddress, handle);
}

/**
 * Batch decrypt multiple values
 *
 * @example
 * ```typescript
 * const decrypted = await batchDecrypt(
 *   fhevmInstance,
 *   [handle1, handle2, handle3],
 *   signer,
 *   { contractAddress, userAddress }
 * );
 * ```
 */
export async function batchDecrypt(
  instance: FhevmInstance,
  handles: bigint[],
  signer: Signer,
  options: DecryptionOptions
): Promise<any[]> {
  const results: any[] = [];

  for (const handle of handles) {
    const value = await decryptU32(instance, handle, signer, options);
    results.push(value);
  }

  return results;
}
