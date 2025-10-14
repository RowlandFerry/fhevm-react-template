/**
 * Encryption utilities for FHEVM
 *
 * Provides functions to encrypt various data types for use with FHEVM smart contracts.
 */

import type { FhevmInstance } from 'fhevmjs';
import type { Contract } from 'ethers';

export interface EncryptedInput {
  handles: Uint8Array;
  inputProof: string;
}

export interface EncryptionOptions {
  contractAddress: string;
  userAddress: string;
}

/**
 * Encrypt a boolean value
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBool(fhevmInstance, true, {
 *   contractAddress: '0x...',
 *   userAddress: '0x...'
 * });
 * ```
 */
export async function encryptBool(
  instance: FhevmInstance,
  value: boolean,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.addBool(value);
  return input.encrypt();
}

/**
 * Encrypt an 8-bit unsigned integer
 */
export async function encryptU8(
  instance: FhevmInstance,
  value: number,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.add8(value);
  return input.encrypt();
}

/**
 * Encrypt a 16-bit unsigned integer
 */
export async function encryptU16(
  instance: FhevmInstance,
  value: number,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.add16(value);
  return input.encrypt();
}

/**
 * Encrypt a 32-bit unsigned integer
 */
export async function encryptU32(
  instance: FhevmInstance,
  value: number,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.add32(value);
  return input.encrypt();
}

/**
 * Encrypt a 64-bit unsigned integer
 */
export async function encryptU64(
  instance: FhevmInstance,
  value: bigint,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.add64(value);
  return input.encrypt();
}

/**
 * Encrypt an Ethereum address
 */
export async function encryptAddress(
  instance: FhevmInstance,
  address: string,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
  input.addAddress(address);
  return input.encrypt();
}

/**
 * Create encrypted input builder for multiple values
 *
 * @example
 * ```typescript
 * const builder = createEncryptedInputBuilder(fhevmInstance, {
 *   contractAddress: '0x...',
 *   userAddress: '0x...'
 * });
 *
 * builder.add8(42).add32(1000).addBool(true);
 * const encrypted = await builder.encrypt();
 * ```
 */
export function createEncryptedInputBuilder(
  instance: FhevmInstance,
  options: EncryptionOptions
) {
  return instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );
}

/**
 * Helper to encrypt input and prepare for contract call
 *
 * @example
 * ```typescript
 * const { handles, inputProof } = await prepareEncryptedInput(
 *   fhevmInstance,
 *   (input) => {
 *     input.add32(safetyLevel);
 *     input.add32(locationCode);
 *     input.add32(foodTypeCode);
 *   },
 *   { contractAddress, userAddress }
 * );
 *
 * await contract.submitReport(handles, inputProof, description);
 * ```
 */
export async function prepareEncryptedInput(
  instance: FhevmInstance,
  buildInputs: (input: ReturnType<FhevmInstance['createEncryptedInput']>) => void,
  options: EncryptionOptions
): Promise<EncryptedInput> {
  const input = instance.createEncryptedInput(
    options.contractAddress,
    options.userAddress
  );

  buildInputs(input);

  return input.encrypt();
}
