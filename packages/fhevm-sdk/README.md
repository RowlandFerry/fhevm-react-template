# @fhevm/sdk

Universal FHEVM SDK for building confidential frontends with Fully Homomorphic Encryption.

## Features

- **Framework Agnostic**: Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- **Unified API**: Simple, consistent API for encryption and decryption
- **React Hooks**: wagmi-like hooks for React applications
- **TypeScript Support**: Full type definitions included
- **Zero Configuration**: Sensible defaults, minimal setup required

## Installation

```bash
npm install @fhevm/sdk fhevmjs ethers
```

## Quick Start

### Vanilla JavaScript / Node.js

```typescript
import { createFhevmClient, encryptU32, decryptU32 } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Initialize client
const client = createFhevmClient({
  networkUrl: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai'
});

// Initialize with provider
const provider = new BrowserProvider(window.ethereum);
await client.init(provider);
const instance = client.getInstance();

// Encrypt value
const encrypted = await encryptU32(instance, 42, {
  contractAddress: '0x...',
  userAddress: '0x...'
});

// Decrypt value
const signer = await provider.getSigner();
const decrypted = await decryptU32(instance, encryptedHandle, signer, {
  contractAddress: '0x...',
  userAddress: '0x...'
});
```

### React / Next.js

```tsx
import { FhevmProvider, useEncrypt, useDecrypt, useFhevmStatus } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Wrap your app
function App() {
  return (
    <FhevmProvider
      config={{
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai'
      }}
    >
      <YourApp />
    </FhevmProvider>
  );
}

// Use in components
function MyComponent() {
  const { encrypt, isLoading } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint32', {
      contractAddress: '0x...',
      userAddress: '0x...'
    });
    console.log('Encrypted:', encrypted);
  };

  if (!isReady) return <div>Initializing FHEVM...</div>;

  return <button onClick={handleEncrypt}>Encrypt Value</button>;
}
```

## API Reference

### Core Functions

- `createFhevmClient(config)` - Create FHEVM client instance
- `encryptU8/U16/U32/U64(instance, value, options)` - Encrypt integers
- `encryptBool(instance, value, options)` - Encrypt boolean
- `encryptAddress(instance, address, options)` - Encrypt Ethereum address
- `decryptU8/U16/U32/U64(instance, handle, signer, options)` - Decrypt integers
- `decryptBool(instance, handle, signer, options)` - Decrypt boolean
- `decryptAddress(instance, handle, signer, options)` - Decrypt address

### React Hooks

- `useFhevmContext()` - Access FHEVM context
- `useEncrypt()` - Hook for encrypting data
- `useDecrypt()` - Hook for decrypting data
- `useEncryptedInput()` - Build encrypted inputs with multiple values
- `useFhevmStatus()` - Check initialization status

## Examples

See the `/examples` directory for complete examples:

- `nextjs-app` - Next.js application
- `react-example` - React application
- `food-safety-reporter` - Full dApp example

## License

MIT
