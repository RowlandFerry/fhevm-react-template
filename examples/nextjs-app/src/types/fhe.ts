/**
 * FHE-related TypeScript type definitions
 */

export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export type ComputationOperation = 'add' | 'subtract' | 'multiply' | 'compare' | 'min' | 'max';

export interface EncryptionParams {
  value: number;
  type: EncryptionType;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptionParams {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface ComputationParams {
  operation: ComputationOperation;
  operands: number[];
  contractAddress: string;
}

export interface EncryptedData {
  handles: Uint8Array;
  inputProof: string;
  timestamp?: number;
}

export interface DecryptedData {
  value: any;
  timestamp?: number;
}

export interface ComputationResult {
  operation: ComputationOperation;
  operands: number[];
  result: number;
  encryptedHandle: string;
  contractAddress: string;
}
