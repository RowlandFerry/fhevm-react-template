/**
 * React Context Provider for FHEVM
 *
 * Provides FHEVM instance to all child components via React Context.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { BrowserProvider } from 'ethers';
import { FhevmClient, createFhevmClient } from '../core/FhevmClient';
import type { FhevmConfig, FhevmContextValue } from '../utils/types';
import type { FhevmInstance } from 'fhevmjs';

const FhevmContext = createContext<FhevmContextValue | null>(null);

export interface FhevmProviderProps {
  config: FhevmConfig;
  children: React.ReactNode;
  autoInit?: boolean;
  provider?: BrowserProvider;
}

/**
 * FhevmProvider - React Context Provider for FHEVM
 *
 * @example
 * ```tsx
 * import { FhevmProvider } from '@fhevm/sdk';
 *
 * function App() {
 *   return (
 *     <FhevmProvider
 *       config={{
 *         networkUrl: 'https://devnet.zama.ai',
 *         gatewayUrl: 'https://gateway.zama.ai'
 *       }}
 *     >
 *       <YourApp />
 *     </FhevmProvider>
 *   );
 * }
 * ```
 */
export function FhevmProvider({
  config,
  children,
  autoInit = false,
  provider,
}: FhevmProviderProps) {
  const [client] = useState(() => createFhevmClient(config));
  const [instance, setInstance] = useState<FhevmInstance | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = useCallback(
    async (browserProvider: BrowserProvider) => {
      setIsLoading(true);
      setError(null);

      try {
        const fhevmInstance = await client.init(browserProvider);
        setInstance(fhevmInstance);
        setIsInitialized(true);
      } catch (err) {
        const error = err as Error;
        setError(error);
        console.error('Failed to initialize FHEVM:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    client.reset();
    setInstance(null);
    setIsInitialized(false);
    setError(null);
  }, [client]);

  // Auto-initialize if provider is provided
  useEffect(() => {
    if (autoInit && provider && !isInitialized && !isLoading) {
      init(provider);
    }
  }, [autoInit, provider, isInitialized, isLoading, init]);

  const value: FhevmContextValue = {
    instance,
    isInitialized,
    isLoading,
    error,
    init,
    reset,
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
}

/**
 * Hook to access FHEVM context
 *
 * @throws Error if used outside FhevmProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { instance, isInitialized } = useFhevmContext();
 *
 *   if (!isInitialized) return <div>Loading...</div>;
 *
 *   return <div>FHEVM ready!</div>;
 * }
 * ```
 */
export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);

  if (!context) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }

  return context;
}
