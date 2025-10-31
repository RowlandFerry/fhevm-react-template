'use client';

import React, { useState } from 'react';
import { useFhevmStatus } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

/**
 * Computation Demo Component
 * Demonstrates homomorphic computation on encrypted data
 */
export const ComputationDemo: React.FC = () => {
  const { isReady } = useFhevmStatus();

  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [operand1, setOperand1] = useState<string>('10');
  const [operand2, setOperand2] = useState<string>('5');
  const [contractAddress, setContractAddress] = useState<string>('0x0000000000000000000000000000000000000000');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCompute = async () => {
    if (!isReady) {
      setError('FHEVM is not initialized yet');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      // Simulate computation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const num1 = parseInt(operand1);
      const num2 = parseInt(operand2);
      let plainResult = 0;

      switch (operation) {
        case 'add':
          plainResult = num1 + num2;
          break;
        case 'subtract':
          plainResult = num1 - num2;
          break;
        case 'multiply':
          plainResult = num1 * num2;
          break;
      }

      setResult({
        operation,
        operands: [num1, num2],
        plainResult,
        encryptedHandle: 'encrypted_result_handle_' + Date.now(),
        contractAddress
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Homomorphic Computation" subtitle="Perform operations on encrypted data">
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
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Operand 1"
            type="number"
            value={operand1}
            onChange={(e) => setOperand1(e.target.value)}
            placeholder="First value"
          />

          <Input
            label="Operand 2"
            type="number"
            value={operand2}
            onChange={(e) => setOperand2(e.target.value)}
            placeholder="Second value"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          onClick={handleCompute}
          loading={isLoading}
          disabled={!isReady || isLoading}
          className="w-full"
        >
          {isLoading ? 'Computing...' : 'Compute'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Computation Result:</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Operation:</span> {result.operation}</p>
              <p><span className="font-medium">Input:</span> {result.operands[0]} {operation === 'add' ? '+' : operation === 'subtract' ? '-' : '×'} {result.operands[1]}</p>
              <p><span className="font-medium">Plain Result:</span> {result.plainResult}</p>
              <p><span className="font-medium">Encrypted Handle:</span> <span className="font-mono text-xs">{result.encryptedHandle}</span></p>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              Note: In production, the result would remain encrypted until authorized decryption
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
