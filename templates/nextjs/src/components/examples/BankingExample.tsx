'use client';

import React, { useState } from 'react';
import { useEncrypt, useFhevmStatus } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

/**
 * Banking Example Component
 * Demonstrates a confidential banking transaction using FHEVM
 */
export const BankingExample: React.FC = () => {
  const { encrypt, isLoading: isEncrypting } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [transferAmount, setTransferAmount] = useState<string>('500');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('0x0000000000000000000000000000000000000000');
  const [transaction, setTransaction] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleTransfer = async () => {
    if (!isReady) {
      setError('FHEVM is not initialized yet');
      return;
    }

    if (!userAddress || !recipientAddress) {
      setError('Please provide both user and recipient addresses');
      return;
    }

    try {
      setError('');

      const amount = parseInt(transferAmount);
      const balance = parseInt(accountBalance);

      if (isNaN(amount) || isNaN(balance)) {
        setError('Please enter valid numbers');
        return;
      }

      if (amount > balance) {
        setError('Insufficient balance');
        return;
      }

      // Encrypt the transfer amount
      const encryptedAmount = await encrypt(amount, 'uint32', {
        contractAddress,
        userAddress
      });

      // Simulate transaction
      const newBalance = balance - amount;

      setTransaction({
        from: userAddress,
        to: recipientAddress,
        encryptedAmount: encryptedAmount.handles.toString(),
        plainAmount: amount,
        newBalance,
        timestamp: new Date().toISOString(),
        status: 'success'
      });

      setAccountBalance(newBalance.toString());
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Card title="Confidential Banking" subtitle="Private financial transactions using FHE">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-blue-900">${accountBalance}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <Input
          label="Your Wallet Address"
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="0x..."
          helperText="Your wallet address"
        />

        <Input
          label="Recipient Address"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="0x..."
          helperText="Address to send funds to"
        />

        <Input
          label="Contract Address"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          helperText="Banking contract address"
        />

        <Input
          label="Transfer Amount ($)"
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Enter amount"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          onClick={handleTransfer}
          loading={isEncrypting}
          disabled={!isReady || isEncrypting}
          className="w-full"
        >
          {isEncrypting ? 'Processing...' : 'Send Confidential Transfer'}
        </Button>

        {transaction && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-900">Transaction Successful</h4>
              <span className="text-2xl">✅</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-mono text-xs">{transaction.from.substring(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-mono text-xs">{transaction.to.substring(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${transaction.plainAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Balance:</span>
                <span className="font-semibold">${transaction.newBalance}</span>
              </div>
              <div className="pt-2 border-t border-green-300">
                <p className="text-xs text-gray-600">Encrypted Handle:</p>
                <p className="font-mono text-xs break-all mt-1">{transaction.encryptedAmount.substring(0, 50)}...</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              ✨ The transaction amount was encrypted before being sent to the blockchain,
              ensuring complete privacy of your financial data.
            </p>
          </div>
        )}

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Privacy Features:</strong>
            <br />
            • Transaction amounts are encrypted end-to-end
            <br />
            • Only authorized parties can view balances
            <br />
            • Computations happen on encrypted data
            <br />• No plaintext exposure on-chain
          </p>
        </div>
      </div>
    </Card>
  );
};
