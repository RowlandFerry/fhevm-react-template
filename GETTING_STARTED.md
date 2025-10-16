# Getting Started with FHEVM SDK

This guide will help you get up and running with the FHEVM SDK in under 10 minutes.

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- MetaMask or compatible Web3 wallet
- Basic knowledge of JavaScript/TypeScript

## Installation

### Option 1: Use the Monorepo (Recommended for Learning)

Clone and explore the complete project:

```bash
# Clone the repository
git clone https://github.com/yourusername/fhevm-sdk.git
cd fhevm-sdk

# Install all dependencies
npm install

# Build the SDK
npm run build:sdk

# Run the Next.js example
npm run dev:nextjs
```

Open [http://localhost:3000](http://localhost:3000) and try the demo!

### Option 2: Add to Your Existing Project

Install the SDK in your project:

```bash
npm install @fhevm/sdk fhevmjs ethers
```

## Quick Start Examples

### 1. Vanilla JavaScript / Node.js

Create a simple encryption script:

```javascript
import { createFhevmClient, encryptU32 } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Initialize
const client = createFhevmClient({
  networkUrl: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai'
});

const provider = new BrowserProvider(window.ethereum);
await client.init(provider);
const instance = client.getInstance();

// Encrypt
const encrypted = await encryptU32(instance, 42, {
  contractAddress: '0xYourContractAddress',
  userAddress: '0xYourWalletAddress'
});

console.log('Encrypted:', encrypted);
```

### 2. React Application

Set up a React component with encryption:

```tsx
import { FhevmProvider, useEncrypt, useFhevmStatus } from '@fhevm/sdk';

// Wrap your app
function App() {
  return (
    <FhevmProvider
      config={{
        networkUrl: 'https://devnet.zama.ai',
        gatewayUrl: 'https://gateway.zama.ai'
      }}
    >
      <EncryptionDemo />
    </FhevmProvider>
  );
}

// Use in components
function EncryptionDemo() {
  const { encrypt, isLoading } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const handleClick = async () => {
    const result = await encrypt(42, 'uint32', {
      contractAddress: '0x...',
      userAddress: '0x...'
    });
    console.log('Encrypted:', result);
  };

  if (!isReady) return <div>Loading FHEVM...</div>;

  return (
    <button onClick={handleClick} disabled={isLoading}>
      Encrypt Value
    </button>
  );
}
```

### 3. Next.js Application

Create a new Next.js page:

```tsx
'use client';

import { FhevmProvider, useEncrypt } from '@fhevm/sdk';

export default function Home() {
  return (
    <FhevmProvider config={{ networkUrl: 'https://devnet.zama.ai' }}>
      <YourComponent />
    </FhevmProvider>
  );
}
```

## Common Workflows

### Encrypting Multiple Values

When submitting a transaction with multiple encrypted values:

```javascript
import { prepareEncryptedInput } from '@fhevm/sdk';

const { handles, inputProof } = await prepareEncryptedInput(
  instance,
  (input) => {
    input.add8(42);        // Safety level
    input.add32(1000);     // Location code
    input.add32(5001);     // Food type code
  },
  { contractAddress, userAddress }
);

// Use in contract call
await contract.submitData(handles, inputProof, additionalData);
```

### Decrypting Values

Decrypt encrypted values from contract:

```javascript
import { decryptU32 } from '@fhevm/sdk';

const signer = await provider.getSigner();
const decrypted = await decryptU32(
  instance,
  encryptedHandle,
  signer,
  { contractAddress, userAddress }
);
```

## Next Steps

1. **Explore Examples**
   - Try the [Next.js example](./examples/nextjs-app/)
   - Review the [Food Safety Reporter](./examples/food-safety-reporter/)

2. **Read Documentation**
   - [SDK API Reference](./packages/fhevm-sdk/README.md)
   - [Main README](./README.md)

3. **Build Your dApp**
   - Start with a template
   - Integrate the SDK
   - Deploy your smart contract

## Common Issues

### Issue: "FHEVM instance not initialized"

**Solution**: Ensure you call `init()` before using encryption/decryption:

```javascript
await client.init(provider);
```

### Issue: "No Ethereum wallet detected"

**Solution**: Install MetaMask or another Web3 wallet

### Issue: Build errors in Next.js

**Solution**: Add webpack configuration in `next.config.js`:

```javascript
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
```

## Getting Help

- Check [existing issues](https://github.com/yourusername/fhevm-sdk/issues)
- Read the [FAQ](#)
- Join the [discussions](https://github.com/yourusername/fhevm-sdk/discussions)

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [Ethers.js Documentation](https://docs.ethers.org)

Happy building! 🚀
