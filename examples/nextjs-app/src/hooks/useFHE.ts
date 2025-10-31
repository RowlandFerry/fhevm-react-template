/**
 * Custom FHE Hook
 * Combines multiple FHEVM SDK hooks for convenient usage
 */

'use client';

import { useFhevmContext, useEncrypt, useDecrypt, useFhevmStatus } from '@fhevm/sdk';

export function useFHE() {
  const { instance, init } = useFhevmContext();
  const { encrypt, isLoading: isEncrypting } = useEncrypt();
  const { decrypt, isLoading: isDecrypting } = useDecrypt();
  const { isReady, error } = useFhevmStatus();

  return {
    // Instance
    instance,
    init,

    // Status
    isReady,
    error,

    // Encryption
    encrypt,
    isEncrypting,

    // Decryption
    decrypt,
    isDecrypting,

    // Combined loading state
    isLoading: isEncrypting || isDecrypting
  };
}
