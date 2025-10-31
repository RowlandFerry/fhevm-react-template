import { useState } from 'react'
import { BrowserProvider } from 'ethers'
import { FhevmProvider } from '@fhevm/sdk'
import { EncryptionDemo } from './components/EncryptionDemo'
import { DecryptionDemo } from './components/DecryptionDemo'
import { WalletConnect } from './components/WalletConnect'
import './App.css'

function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt')

  const handleConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    try {
      const browserProvider = new BrowserProvider(window.ethereum)
      await browserProvider.send('eth_requestAccounts', [])
      const signer = await browserProvider.getSigner()
      const address = await signer.getAddress()

      setProvider(browserProvider)
      setUserAddress(address)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  return (
    <FhevmProvider
      config={{
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai',
        network: {
          chainId: 8009,
          name: 'Zama Devnet',
        },
      }}
      provider={provider}
    >
      <div className="app">
        <header className="header">
          <h1>FHEVM React Example</h1>
          <p>Demonstrating Fully Homomorphic Encryption in React</p>
        </header>

        <WalletConnect
          isConnected={!!provider}
          userAddress={userAddress}
          onConnect={handleConnect}
        />

        {provider && (
          <>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'encrypt' ? 'active' : ''}`}
                onClick={() => setActiveTab('encrypt')}
              >
                Encryption Demo
              </button>
              <button
                className={`tab ${activeTab === 'decrypt' ? 'active' : ''}`}
                onClick={() => setActiveTab('decrypt')}
              >
                Decryption Demo
              </button>
            </div>

            <div className="content">
              {activeTab === 'encrypt' && <EncryptionDemo userAddress={userAddress!} />}
              {activeTab === 'decrypt' && <DecryptionDemo provider={provider} userAddress={userAddress!} />}
            </div>
          </>
        )}

        {!provider && (
          <div className="info-card">
            <h3>Getting Started</h3>
            <p>Connect your wallet to start exploring FHEVM encryption and decryption capabilities.</p>
            <ul>
              <li>Encrypt sensitive data before sending to the blockchain</li>
              <li>Perform computations on encrypted data</li>
              <li>Decrypt results securely using your private key</li>
            </ul>
          </div>
        )}
      </div>
    </FhevmProvider>
  )
}

export default App
