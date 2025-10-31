'use client';

import React, { useState, useEffect } from 'react';
import { useFhevmContext, useFhevmStatus } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

/**
 * Key Manager Component
 * Displays and manages FHE keys and network information
 */
export const KeyManager: React.FC = () => {
  const { instance } = useFhevmContext();
  const { isReady } = useFhevmStatus();
  const [keyInfo, setKeyInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isReady && instance) {
      fetchKeyInfo();
    }
  }, [isReady, instance]);

  const fetchKeyInfo = async () => {
    setIsLoading(true);
    try {
      // Simulate fetching key info
      await new Promise(resolve => setTimeout(resolve, 500));

      setKeyInfo({
        publicKey: 'FHE_PUBLIC_KEY_PLACEHOLDER',
        aclAddress: '0x0000000000000000000000000000000000000000',
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai',
        chainId: 8009,
        lastUpdated: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to fetch key info:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Key Management" subtitle="FHE network keys and configuration">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Status: {isReady ? '✅ Keys Loaded' : '⏳ Loading...'}
          </p>
        </div>

        {keyInfo && (
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Network URL</p>
              <p className="text-sm font-mono break-all">{keyInfo.networkUrl}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Gateway URL</p>
              <p className="text-sm font-mono break-all">{keyInfo.gatewayUrl}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Chain ID</p>
              <p className="text-sm font-mono">{keyInfo.chainId}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">ACL Contract Address</p>
              <p className="text-sm font-mono break-all">{keyInfo.aclAddress}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Public Key (truncated)</p>
              <p className="text-sm font-mono break-all">{keyInfo.publicKey.substring(0, 50)}...</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Last Updated</p>
              <p className="text-sm">{new Date(keyInfo.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
        )}

        <Button
          onClick={fetchKeyInfo}
          loading={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Key Info'}
        </Button>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Info:</strong> Keys are automatically fetched from the network when initializing FHEVM.
            These keys are used to encrypt data before sending to smart contracts.
          </p>
        </div>
      </div>
    </Card>
  );
};
