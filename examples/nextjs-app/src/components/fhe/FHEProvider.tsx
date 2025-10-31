'use client';

import React from 'react';
import { FhevmProvider as SDKFhevmProvider } from '@fhevm/sdk';

interface FHEProviderProps {
  children: React.ReactNode;
  networkUrl?: string;
  gatewayUrl?: string;
}

/**
 * FHE Provider Component
 * Wraps the application with FHEVM SDK context
 * This is a wrapper around the SDK's FhevmProvider for easier configuration
 */
export const FHEProvider: React.FC<FHEProviderProps> = ({
  children,
  networkUrl = 'https://devnet.zama.ai',
  gatewayUrl = 'https://gateway.zama.ai'
}) => {
  return (
    <SDKFhevmProvider
      config={{
        networkUrl,
        gatewayUrl
      }}
    >
      {children}
    </SDKFhevmProvider>
  );
};
