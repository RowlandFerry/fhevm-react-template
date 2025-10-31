import { useState } from 'react'
import { useEncrypt } from '@fhevm/sdk'

interface EncryptionDemoProps {
  userAddress: string
}

export function EncryptionDemo({ userAddress }: EncryptionDemoProps) {
  const { encrypt, isLoading, error } = useEncrypt()
  const [value, setValue] = useState('')
  const [encryptType, setEncryptType] = useState<'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool'>('uint32')
  const [result, setResult] = useState<any>(null)

  const handleEncrypt = async () => {
    if (!value) return

    try {
      let valueToEncrypt: any = value

      if (encryptType === 'bool') {
        valueToEncrypt = value.toLowerCase() === 'true' || value === '1'
      } else {
        valueToEncrypt = parseInt(value)
      }

      const encrypted = await encrypt(valueToEncrypt, encryptType, {
        contractAddress: '0x0000000000000000000000000000000000000000', // Demo address
        userAddress,
      })

      setResult(encrypted)
    } catch (err) {
      console.error('Encryption failed:', err)
    }
  }

  return (
    <div className="card">
      <h2>Encryption Demo</h2>
      <p className="description">
        Encrypt data using Fully Homomorphic Encryption before sending it to the blockchain.
      </p>

      {error && <div className="error">{error.message}</div>}

      <div className="form-group">
        <label>Data Type</label>
        <select value={encryptType} onChange={(e) => setEncryptType(e.target.value as any)}>
          <option value="uint8">uint8 (0-255)</option>
          <option value="uint16">uint16 (0-65535)</option>
          <option value="uint32">uint32</option>
          <option value="uint64">uint64</option>
          <option value="bool">bool</option>
        </select>
      </div>

      <div className="form-group">
        <label>Value to Encrypt</label>
        <input
          type={encryptType === 'bool' ? 'text' : 'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={encryptType === 'bool' ? 'true or false' : 'Enter a number'}
        />
      </div>

      <button className="btn" onClick={handleEncrypt} disabled={isLoading || !value}>
        {isLoading ? 'Encrypting...' : 'Encrypt Data'}
      </button>

      {result && (
        <div className="result">
          <h3>Encrypted Result</h3>
          <div className="result-item">
            <strong>Handle:</strong>
            <code>{result.handle?.toString() || 'N/A'}</code>
          </div>
          <div className="result-item">
            <strong>Input Proof:</strong>
            <code className="truncate">{result.inputProof || 'N/A'}</code>
          </div>
          <div className="success-message">
            ✅ Data encrypted successfully! This encrypted value can now be sent to a smart contract.
          </div>
        </div>
      )}
    </div>
  )
}
