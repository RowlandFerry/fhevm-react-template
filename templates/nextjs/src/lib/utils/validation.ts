/**
 * Validation utility functions
 */

import { isValidAddress, isWithinUintBounds } from './security';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate encryption parameters
 */
export function validateEncryptionParams(
  value: string,
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64',
  contractAddress: string,
  userAddress: string
): ValidationResult {
  // Validate addresses
  if (!isValidAddress(contractAddress)) {
    return { valid: false, error: 'Invalid contract address format' };
  }

  if (!isValidAddress(userAddress)) {
    return { valid: false, error: 'Invalid user address format' };
  }

  // Validate value
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return { valid: false, error: 'Value must be a valid number' };
  }

  // Check uint bounds
  const bits = parseInt(type.replace('uint', '')) as 8 | 16 | 32 | 64;
  if (!isWithinUintBounds(numValue, bits)) {
    return { valid: false, error: `Value must be within ${type} range` };
  }

  return { valid: true };
}

/**
 * Validate decryption parameters
 */
export function validateDecryptionParams(
  handle: string,
  contractAddress: string,
  userAddress: string
): ValidationResult {
  if (!handle || handle.trim() === '') {
    return { valid: false, error: 'Handle is required' };
  }

  if (!isValidAddress(contractAddress)) {
    return { valid: false, error: 'Invalid contract address format' };
  }

  if (!isValidAddress(userAddress)) {
    return { valid: false, error: 'Invalid user address format' };
  }

  return { valid: true };
}

/**
 * Validate contract interaction parameters
 */
export function validateContractParams(
  contractAddress: string,
  method: string,
  params: any[]
): ValidationResult {
  if (!isValidAddress(contractAddress)) {
    return { valid: false, error: 'Invalid contract address format' };
  }

  if (!method || method.trim() === '') {
    return { valid: false, error: 'Method name is required' };
  }

  if (!Array.isArray(params)) {
    return { valid: false, error: 'Parameters must be an array' };
  }

  return { valid: true };
}

/**
 * Validate transaction data
 */
export function validateTransaction(
  from: string,
  to: string,
  value?: string
): ValidationResult {
  if (!isValidAddress(from)) {
    return { valid: false, error: 'Invalid sender address' };
  }

  if (!isValidAddress(to)) {
    return { valid: false, error: 'Invalid recipient address' };
  }

  if (value) {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      return { valid: false, error: 'Invalid transaction value' };
    }
  }

  return { valid: true };
}
