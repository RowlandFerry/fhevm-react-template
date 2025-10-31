/**
 * FHE-related type definitions
 */

import { FhevmInstance } from 'fhevmjs';

export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export interface EncryptionOptions {
  contractAddress: string;
  userAddress: string;
}

export interface EncryptionResult {
  handles: Uint8Array;
  inputProof: string;
}

export interface DecryptionOptions {
  contractAddress: string;
  userAddress: string;
}

export interface FhevmConfig {
  networkUrl: string;
  gatewayUrl?: string;
  publicKey?: string;
  aclAddress?: string;
}

export interface FhevmContextValue {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  error: Error | null;
  init: (provider: any) => Promise<void>;
}

export interface TransactionData {
  from: string;
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
}
