'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmProvider, useEncrypt, useDecrypt, useFhevmStatus, useFhevmContext } from '@fhevm/sdk';

function EncryptionDemo() {
  const { instance, init } = useFhevmContext();
  const { encrypt, isLoading: isEncrypting } = useEncrypt();
  const { isReady } = useFhevmStatus();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [value, setValue] = useState<string>('42');
  const [encrypted, setEncrypted] = useState<any>(null);
  const [contractAddress, setContractAddress] = useState<string>('0x0000000000000000000000000000000000000000');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const ethProvider = new BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;

    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);

      // Initialize FHEVM
      await init(provider);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleEncrypt = async () => {
    if (!isReady || !account) {
      alert('Please connect wallet and wait for FHEVM to initialize');
      return;
    }

    try {
      const numValue = parseInt(value);
      const result = await encrypt(numValue, 'uint32', {
        contractAddress,
        userAddress: account,
      });

      setEncrypted(result);
      console.log('Encrypted result:', result);
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Encryption failed: ' + (error as Error).message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>FHEVM Next.js Example</h1>
      <p>Demonstrating @fhevm/sdk in a Next.js application</p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Connection Status</h2>
        <p>Provider: {provider ? '✅ Connected' : '❌ Not connected'}</p>
        <p>Account: {account || 'Not connected'}</p>
        <p>FHEVM: {isReady ? '✅ Initialized' : '⏳ Not initialized'}</p>

        {!account && (
          <button
            onClick={connectWallet}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {account && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Encrypt Value</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              Contract Address:
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  fontFamily: 'monospace',
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              Value to encrypt (uint32):
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                }}
              />
            </label>
          </div>

          <button
            onClick={handleEncrypt}
            disabled={isEncrypting || !isReady}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isEncrypting || !isReady ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isEncrypting || !isReady ? 'not-allowed' : 'pointer',
            }}
          >
            {isEncrypting ? 'Encrypting...' : 'Encrypt'}
          </button>

          {encrypted && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
              <h3>Encrypted Result:</h3>
              <p style={{ wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                Handles: {encrypted.handles.toString()}
              </p>
              <p style={{ wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                Input Proof: {encrypted.inputProof.substring(0, 100)}...
              </p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>About This Example</h3>
        <p>
          This Next.js application demonstrates the @fhevm/sdk in action:
        </p>
        <ul>
          <li>Connect your MetaMask wallet</li>
          <li>Initialize FHEVM instance automatically</li>
          <li>Encrypt values using the useEncrypt hook</li>
          <li>See encrypted results in real-time</li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <FhevmProvider
      config={{
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai',
      }}
    >
      <EncryptionDemo />
    </FhevmProvider>
  );
}
