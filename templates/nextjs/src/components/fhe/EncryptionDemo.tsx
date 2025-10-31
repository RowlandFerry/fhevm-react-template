'use client';

import React, { useState } from 'react';
import { useEncrypt, useFhevmStatus, useFhevmContext } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

/**
 * Encryption Demo Component
 * Demonstrates encryption functionality using the FHEVM SDK
 */
export const EncryptionDemo: React.FC = () => {
  const { instance } = useFhevmContext();
  const { encrypt, isLoading } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const [value, setValue] = useState<string>('42');
  const [encryptionType, setEncryptionType] = useState<'uint8' | 'uint16' | 'uint32' | 'uint64'>('uint32');
  const [contractAddress, setContractAddress] = useState<string>('0x0000000000000000000000000000000000000000');
  const [userAddress, setUserAddress] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleEncrypt = async () => {
    if (!isReady) {
      setError('FHEVM is not initialized yet');
      return;
    }

    if (!userAddress) {
      setError('Please provide a user address');
      return;
    }

    try {
      setError('');
      const numValue = parseInt(value);

      if (isNaN(numValue)) {
        setError('Please enter a valid number');
        return;
      }

      const encrypted = await encrypt(numValue, encryptionType, {
        contractAddress,
        userAddress
      });

      setResult(encrypted);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt values using FHEVM">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Status: {isReady ? '✅ Ready' : '⏳ Initializing...'}
          </p>
        </div>

        <Input
          label="Contract Address"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          helperText="The smart contract address to encrypt for"
        />

        <Input
          label="User Address"
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="0x..."
          helperText="Your wallet address"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Encryption Type
          </label>
          <select
            value={encryptionType}
            onChange={(e) => setEncryptionType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="uint8">uint8 (0-255)</option>
            <option value="uint16">uint16 (0-65535)</option>
            <option value="uint32">uint32 (0-4294967295)</option>
            <option value="uint64">uint64</option>
          </select>
        </div>

        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          onClick={handleEncrypt}
          loading={isLoading}
          disabled={!isReady || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Value'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Encrypted Result:</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Handles:</span>
                <p className="font-mono break-all text-xs mt-1">{result.handles.toString()}</p>
              </div>
              <div>
                <span className="font-medium">Input Proof:</span>
                <p className="font-mono break-all text-xs mt-1">{result.inputProof.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
