/**
 * Common types and interfaces for FHEVM SDK
 */

import type { FhevmInstance } from 'fhevmjs';
import type { BrowserProvider, Contract, Signer } from 'ethers';

export interface FhevmConfig {
  networkUrl: string;
  gatewayUrl?: string;
  publicKey?: string;
  aclAddress?: string;
  network?: {
    chainId: number;
    name: string;
  };
}

export interface FhevmContextValue {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  init: (provider: BrowserProvider) => Promise<void>;
  reset: () => void;
}

export interface EncryptOptions {
  contractAddress: string;
  userAddress: string;
}

export interface DecryptOptions {
  contractAddress: string;
  userAddress: string;
  signer: Signer;
}

export interface ContractConfig {
  address: string;
  abi: any[];
}

export type EncryptedValue = {
  handles: Uint8Array;
  inputProof: string;
};

export enum EncryptedType {
  BOOL = 'ebool',
  UINT8 = 'euint8',
  UINT16 = 'euint16',
  UINT32 = 'euint32',
  UINT64 = 'euint64',
  ADDRESS = 'eaddress',
}
