/**
 * @fhevm/sdk - Universal FHEVM SDK
 *
 * A framework-agnostic SDK for building confidential frontends with Fully Homomorphic Encryption.
 * Works with React, Next.js, Vue, Node.js, or any JavaScript environment.
 *
 * @example
 * ```typescript
 * import { createFhevmInstance, encryptInput, decryptData } from '@fhevm/sdk';
 *
 * // Initialize FHEVM
 * const fhevm = await createFhevmInstance({
 *   networkUrl: 'https://devnet.zama.ai',
 *   gatewayUrl: 'https://gateway.zama.ai'
 * });
 *
 * // Encrypt input
 * const encrypted = await encryptInput(fhevm, 42);
 *
 * // Decrypt output
 * const decrypted = await decryptData(fhevm, contractAddress, encryptedValue);
 * ```
 */

export * from './core/FhevmClient';
export * from './core/encryption';
export * from './core/decryption';
export * from './utils/types';
export * from './utils/helpers';

// React-specific exports (optional)
export * from './react/hooks';
export * from './react/FhevmProvider';
