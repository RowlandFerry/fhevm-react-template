/**
 * API-related TypeScript type definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptApiRequest {
  value: number;
  type: string;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptApiRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface ComputeApiRequest {
  operation: string;
  operands: number[];
  contractAddress: string;
}

export interface KeyApiResponse {
  publicKey: string;
  aclAddress: string;
  timestamp: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
}
