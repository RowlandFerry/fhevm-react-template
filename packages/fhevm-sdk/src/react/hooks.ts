/**
 * React hooks for FHEVM operations
 *
 * wagmi-like hooks for encryption, decryption, and contract interactions.
 */

import { useState, useCallback, useEffect } from 'react';
import { useFhevmContext } from './FhevmProvider';
import type { Signer } from 'ethers';
import {
  encryptU8,
  encryptU16,
  encryptU32,
  encryptU64,
  encryptBool,
  encryptAddress,
  prepareEncryptedInput,
} from '../core/encryption';
import {
  decryptU8,
  decryptU16,
  decryptU32,
  decryptU64,
  decryptBool,
  decryptAddress,
} from '../core/decryption';
import type { EncryptOptions, DecryptOptions, EncryptedValue } from '../utils/types';

/**
 * Hook to encrypt data
 *
 * @example
 * ```tsx
 * function EncryptComponent() {
 *   const { encrypt, isLoading, error } = useEncrypt();
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encrypt(42, 'uint32', {
 *       contractAddress: '0x...',
 *       userAddress: '0x...'
 *     });
 *   };
 *
 *   return <button onClick={handleEncrypt}>Encrypt</button>;
 * }
 * ```
 */
export function useEncrypt() {
  const { instance, isInitialized } = useFhevmContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (
      value: any,
      type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address',
      options: EncryptOptions
    ): Promise<EncryptedValue> => {
      if (!instance || !isInitialized) {
        throw new Error('FHEVM instance not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        let result: EncryptedValue;

        switch (type) {
          case 'uint8':
            result = await encryptU8(instance, value, options);
            break;
          case 'uint16':
            result = await encryptU16(instance, value, options);
            break;
          case 'uint32':
            result = await encryptU32(instance, value, options);
            break;
          case 'uint64':
            result = await encryptU64(instance, value, options);
            break;
          case 'bool':
            result = await encryptBool(instance, value, options);
            break;
          case 'address':
            result = await encryptAddress(instance, value, options);
            break;
          default:
            throw new Error(`Unsupported encryption type: ${type}`);
        }

        return result;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [instance, isInitialized]
  );

  return { encrypt, isLoading, error };
}

/**
 * Hook to decrypt data
 *
 * @example
 * ```tsx
 * function DecryptComponent({ signer }) {
 *   const { decrypt, isLoading, error } = useDecrypt();
 *
 *   const handleDecrypt = async () => {
 *     const decrypted = await decrypt(
 *       encryptedHandle,
 *       'uint32',
 *       signer,
 *       { contractAddress: '0x...', userAddress: '0x...' }
 *     );
 *   };
 *
 *   return <button onClick={handleDecrypt}>Decrypt</button>;
 * }
 * ```
 */
export function useDecrypt() {
  const { instance, isInitialized } = useFhevmContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (
      handle: bigint,
      type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address',
      signer: Signer,
      options: DecryptOptions
    ): Promise<any> => {
      if (!instance || !isInitialized) {
        throw new Error('FHEVM instance not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        let result: any;

        switch (type) {
          case 'uint8':
            result = await decryptU8(instance, handle, signer, options);
            break;
          case 'uint16':
            result = await decryptU16(instance, handle, signer, options);
            break;
          case 'uint32':
            result = await decryptU32(instance, handle, signer, options);
            break;
          case 'uint64':
            result = await decryptU64(instance, handle, signer, options);
            break;
          case 'bool':
            result = await decryptBool(instance, handle, signer, options);
            break;
          case 'address':
            result = await decryptAddress(instance, handle, signer, options);
            break;
          default:
            throw new Error(`Unsupported decryption type: ${type}`);
        }

        return result;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [instance, isInitialized]
  );

  return { decrypt, isLoading, error };
}

/**
 * Hook to build encrypted inputs with multiple values
 *
 * @example
 * ```tsx
 * function MultiEncryptComponent() {
 *   const { buildEncryptedInput, isLoading } = useEncryptedInput();
 *
 *   const handleSubmit = async () => {
 *     const { handles, inputProof } = await buildEncryptedInput(
 *       (input) => {
 *         input.add32(safetyLevel);
 *         input.add32(locationCode);
 *         input.add32(foodTypeCode);
 *       },
 *       { contractAddress, userAddress }
 *     );
 *
 *     await contract.submitReport(handles, inputProof, description);
 *   };
 * }
 * ```
 */
export function useEncryptedInput() {
  const { instance, isInitialized } = useFhevmContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const buildEncryptedInput = useCallback(
    async (
      builder: (input: any) => void,
      options: EncryptOptions
    ): Promise<EncryptedValue> => {
      if (!instance || !isInitialized) {
        throw new Error('FHEVM instance not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        return await prepareEncryptedInput(instance, builder, options);
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [instance, isInitialized]
  );

  return { buildEncryptedInput, isLoading, error };
}

/**
 * Hook to check FHEVM initialization status
 *
 * @example
 * ```tsx
 * function StatusComponent() {
 *   const { isReady, isLoading } = useFhevmStatus();
 *
 *   if (isLoading) return <div>Initializing FHEVM...</div>;
 *   if (!isReady) return <div>FHEVM not ready</div>;
 *
 *   return <div>FHEVM ready to use!</div>;
 * }
 * ```
 */
export function useFhevmStatus() {
  const { isInitialized, isLoading, error } = useFhevmContext();

  return {
    isReady: isInitialized,
    isLoading,
    error,
  };
}
