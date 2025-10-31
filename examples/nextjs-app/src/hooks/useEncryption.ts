/**
 * Custom Encryption Hook
 * Enhanced encryption hook with validation and error handling
 */

'use client';

import { useState, useCallback } from 'react';
import { useEncrypt, useFhevmStatus } from '@fhevm/sdk';
import { validateEncryptionParams } from '../lib/utils/validation';

export function useEncryption() {
  const { encrypt, isLoading } = useEncrypt();
  const { isReady } = useFhevmStatus();
  const [error, setError] = useState<string | null>(null);

  const encryptValue = useCallback(async (
    value: string,
    type: 'uint8' | 'uint16' | 'uint32' | 'uint64',
    contractAddress: string,
    userAddress: string
  ) => {
    setError(null);

    if (!isReady) {
      setError('FHEVM is not ready yet');
      return null;
    }

    // Validate parameters
    const validation = validateEncryptionParams(value, type, contractAddress, userAddress);
    if (!validation.valid) {
      setError(validation.error || 'Validation failed');
      return null;
    }

    try {
      const numValue = parseInt(value);
      const result = await encrypt(numValue, type, {
        contractAddress,
        userAddress
      });

      return result;
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      return null;
    }
  }, [encrypt, isReady]);

  return {
    encrypt: encryptValue,
    isLoading,
    error,
    isReady
  };
}
