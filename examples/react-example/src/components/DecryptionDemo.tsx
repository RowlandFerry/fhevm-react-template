import { useState } from 'react'
import { useDecrypt } from '@fhevm/sdk'
import { BrowserProvider } from 'ethers'

interface DecryptionDemoProps {
  provider: BrowserProvider
  userAddress: string
}

export function DecryptionDemo({ provider, userAddress }: DecryptionDemoProps) {
  const { decrypt, isLoading, error } = useDecrypt()
  const [handle, setHandle] = useState('')
  const [decryptType, setDecryptType] = useState<'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool'>('uint32')
  const [result, setResult] = useState<any>(null)

  const handleDecrypt = async () => {
    if (!handle) return

    try {
      const signer = await provider.getSigner()
      const handleBigInt = BigInt(handle)

      const decrypted = await decrypt(handleBigInt, decryptType, signer, {
        contractAddress: '0x0000000000000000000000000000000000000000', // Demo address
        userAddress,
      })

      setResult(decrypted)
    } catch (err) {
      console.error('Decryption failed:', err)
    }
  }

  return (
    <div className="card">
      <h2>Decryption Demo</h2>
      <p className="description">
        Decrypt encrypted data from the blockchain using your private key and EIP-712 signatures.
      </p>

      {error && <div className="error">{error.message}</div>}

      <div className="form-group">
        <label>Data Type</label>
        <select value={decryptType} onChange={(e) => setDecryptType(e.target.value as any)}>
          <option value="uint8">uint8</option>
          <option value="uint16">uint16</option>
          <option value="uint32">uint32</option>
          <option value="uint64">uint64</option>
          <option value="bool">bool</option>
        </select>
      </div>

      <div className="form-group">
        <label>Encrypted Handle</label>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter encrypted handle (bigint)"
        />
        <small>The encrypted handle returned from the blockchain</small>
      </div>

      <button className="btn" onClick={handleDecrypt} disabled={isLoading || !handle}>
        {isLoading ? 'Decrypting...' : 'Decrypt Data'}
      </button>

      {result !== null && (
        <div className="result">
          <h3>Decrypted Result</h3>
          <div className="result-item">
            <strong>Value:</strong>
            <code>{result.toString()}</code>
          </div>
          <div className="success-message">
            ✅ Data decrypted successfully using EIP-712 signature!
          </div>
        </div>
      )}

      <div className="info-box">
        <h4>ℹ️ How it works</h4>
        <ol>
          <li>Smart contract stores encrypted data on-chain</li>
          <li>User requests decryption with their private key</li>
          <li>Gateway verifies EIP-712 signature</li>
          <li>Decrypted value is returned securely</li>
        </ol>
      </div>
    </div>
  )
}
