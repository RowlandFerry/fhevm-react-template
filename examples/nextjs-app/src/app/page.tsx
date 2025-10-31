'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmProvider, useFhevmContext, useFhevmStatus } from '@fhevm/sdk';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

function FhevmApp() {
  const { init } = useFhevmContext();
  const { isReady } = useFhevmStatus();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'encryption' | 'computation' | 'keys' | 'banking' | 'medical'>('encryption');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethProvider = new BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert('Please install MetaMask');
      return;
    }

    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);

      // Initialize FHEVM
      await init(provider);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet: ' + (error as Error).message);
    }
  };

  const tabs = [
    { id: 'encryption', label: 'Encryption', icon: '🔐' },
    { id: 'computation', label: 'Computation', icon: '⚡' },
    { id: 'keys', label: 'Keys', icon: '🔑' },
    { id: 'banking', label: 'Banking', icon: '💰' },
    { id: 'medical', label: 'Medical', icon: '🏥' }
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FHEVM Next.js Demo</h1>
              <p className="text-sm text-gray-600 mt-1">
                Demonstrating @fhevm/sdk integration with comprehensive examples
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-500">Status</div>
                <div className={`text-sm font-medium ${isReady ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isReady ? '✅ Ready' : '⏳ Initializing...'}
                </div>
              </div>
              {!account ? (
                <Button onClick={connectWallet} size="sm">
                  Connect Wallet
                </Button>
              ) : (
                <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs text-gray-600">Connected</div>
                  <div className="text-sm font-mono text-green-700">
                    {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6">
          <Card padding="sm">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'encryption' && <EncryptionDemo />}
          {activeTab === 'computation' && <ComputationDemo />}
          {activeTab === 'keys' && <KeyManager />}
          {activeTab === 'banking' && <BankingExample />}
          {activeTab === 'medical' && <MedicalExample />}
        </div>

        {/* Info Section */}
        <div className="mt-8">
          <Card title="About This Demo" padding="lg">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features Demonstrated:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">🔐</span>
                    <span><strong>Encryption:</strong> Encrypt values of different types (uint8, uint16, uint32, uint64) using FHEVM</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span><strong>Computation:</strong> Perform homomorphic operations on encrypted data (add, subtract, multiply)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔑</span>
                    <span><strong>Key Management:</strong> View and manage FHE network keys and configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💰</span>
                    <span><strong>Banking Example:</strong> Private financial transactions with encrypted amounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏥</span>
                    <span><strong>Medical Example:</strong> HIPAA-compliant medical records with FHE encryption</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">SDK Integration:</h3>
                <p className="text-sm text-gray-700">
                  This application uses the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">@fhevm/sdk</code> package,
                  which provides a framework-agnostic API for FHEVM operations. The SDK includes:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700 ml-4">
                  <li>• Core encryption/decryption utilities</li>
                  <li>• React hooks (useEncrypt, useDecrypt, useFhevmContext, etc.)</li>
                  <li>• TypeScript type definitions</li>
                  <li>• Helper functions and validation</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Project Structure:</h3>
                <div className="text-xs font-mono bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  <pre className="text-gray-700">{`src/
├── app/                   # Next.js App Router
│   ├── api/              # API routes (FHE operations)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # This page
├── components/
│   ├── ui/               # Base UI components
│   ├── fhe/              # FHE-specific components
│   └── examples/         # Example use cases
├── lib/                  # Utility libraries
│   ├── fhe/              # FHE utilities
│   └── utils/            # Helper functions
├── hooks/                # Custom React hooks
└── types/                # TypeScript definitions`}</pre>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>Built with @fhevm/sdk • Next.js 14 • TypeScript</p>
            <p className="mt-1">Fully Homomorphic Encryption for Confidential Computing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <FhevmProvider
      config={{
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai'
      }}
    >
      <FhevmApp />
    </FhevmProvider>
  );
}
