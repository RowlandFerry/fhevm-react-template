# FHEVM SDK - Universal Confidential Computing Toolkit

A comprehensive, framework-agnostic SDK for building confidential frontends with Fully Homomorphic Encryption (FHE). Designed to make FHEVM development simple, consistent, and developer-friendly.

**Demo Video**: [Watch the demonstration demo.mp4]

**Live Demo**: [https://fhe-food-safety.vercel.app/](https://fhe-food-safety.vercel.app/)

## Overview

This project provides a universal FHEVM SDK that works across all JavaScript frameworks and environments. Whether you're building with React, Next.js, Vue, or vanilla Node.js, the SDK offers a consistent, wagmi-like API for encryption and decryption operations.

## Key Features

### Universal SDK (`@fhevm/sdk`)

- **Framework Agnostic**: Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- **Unified API**: Consistent interface across all platforms
- **React Hooks**: wagmi-like hooks for React applications
- **TypeScript Support**: Full type definitions for better DX
- **Zero Config**: Sensible defaults, minimal setup required
- **Modular Design**: Import only what you need

### Developer Experience

- **< 10 Lines to Start**: Get up and running quickly
- **Comprehensive Examples**: Multiple framework examples included
- **Clear Documentation**: Detailed guides and API reference
- **Type Safety**: Full TypeScript support throughout

## Quick Start

### Installation

```bash
# From root directory
npm install

# Or in your own project
npm install @fhevm/sdk fhevmjs ethers
```

### Basic Usage (Vanilla JS / Node.js)

```javascript
import { createFhevmClient, encryptU32, decryptU32 } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// 1. Create client
const client = createFhevmClient({
  networkUrl: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai'
});

// 2. Initialize with provider
const provider = new BrowserProvider(window.ethereum);
await client.init(provider);
const instance = client.getInstance();

// 3. Encrypt data
const encrypted = await encryptU32(instance, 42, {
  contractAddress: '0x...',
  userAddress: '0x...'
});

// 4. Decrypt data
const signer = await provider.getSigner();
const decrypted = await decryptU32(instance, handle, signer, {
  contractAddress: '0x...',
  userAddress: '0x...'
});
```

### React / Next.js Usage

```tsx
import { FhevmProvider, useEncrypt, useFhevmStatus } from '@fhevm/sdk';

// Wrap your app
function App() {
  return (
    <FhevmProvider config={{ networkUrl: 'https://devnet.zama.ai' }}>
      <YourApp />
    </FhevmProvider>
  );
}

// Use in components
function MyComponent() {
  const { encrypt, isLoading } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'uint32', {
      contractAddress: '0x...',
      userAddress: '0x...'
    });
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

## Project Structure

```
.
├── packages/
│   └── fhevm-sdk/              # Universal FHEVM SDK
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   │   ├── FhevmClient.ts      # Main client
│       │   │   ├── encryption.ts       # Encryption utilities
│       │   │   └── decryption.ts       # Decryption utilities
│       │   ├── react/          # React-specific features
│       │   │   ├── FhevmProvider.tsx   # Context provider
│       │   │   └── hooks.ts            # React hooks
│       │   ├── utils/          # Utilities
│       │   │   ├── types.ts            # Type definitions
│       │   │   └── helpers.ts          # Helper functions
│       │   └── index.ts        # Main exports
│       └── README.md           # SDK documentation
│
├── templates/                  # Framework templates
│   ├── nextjs/                 # Next.js template
│   └── react/                  # React template
│
├── examples/
│   ├── nextjs-app/             # Next.js example (Required)
│   │   ├── src/
│   │   │   ├── app/            # App Router
│   │   │   │   ├── page.tsx    # Main page
│   │   │   │   ├── layout.tsx  # Root layout
│   │   │   │   ├── globals.css # Global styles
│   │   │   │   └── api/        # API routes
│   │   │   │       ├── fhe/    # FHE operations
│   │   │   │       │   ├── route.ts
│   │   │   │       │   ├── encrypt/route.ts
│   │   │   │       │   ├── decrypt/route.ts
│   │   │   │       │   └── compute/route.ts
│   │   │   │       └── keys/route.ts
│   │   │   │
│   │   │   ├── components/     # React components
│   │   │   │   ├── ui/         # Base UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── Card.tsx
│   │   │   │   ├── fhe/        # FHE components
│   │   │   │   │   ├── FHEProvider.tsx
│   │   │   │   │   ├── EncryptionDemo.tsx
│   │   │   │   │   ├── ComputationDemo.tsx
│   │   │   │   │   └── KeyManager.tsx
│   │   │   │   └── examples/   # Example components
│   │   │   │       ├── BankingExample.tsx
│   │   │   │       └── MedicalExample.tsx
│   │   │   │
│   │   │   ├── lib/            # Libraries
│   │   │   │   ├── fhe/        # FHE utilities
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── server.ts
│   │   │   │   │   ├── keys.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── utils/      # Utility functions
│   │   │   │       ├── security.ts
│   │   │   │       └── validation.ts
│   │   │   │
│   │   │   ├── hooks/          # Custom hooks
│   │   │   │   ├── useFHE.ts
│   │   │   │   ├── useEncryption.ts
│   │   │   │   └── useComputation.ts
│   │   │   │
│   │   │   └── types/          # TypeScript types
│   │   │       ├── fhe.ts
│   │   │       └── api.ts
│   │   │
│   │   └── package.json
│   │
│   ├── react-example/          # React example with SDK integration
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   │   ├── WalletConnect.tsx
│   │   │   │   ├── EncryptionDemo.tsx
│   │   │   │   └── DecryptionDemo.tsx
│   │   │   ├── App.tsx         # Main application
│   │   │   └── main.tsx        # Entry point
│   │   └── package.json
│   │
│   └── food-safety-reporter/   # Complete React dApp example
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom hooks
│       │   ├── context/        # React context
│       │   ├── types/          # TypeScript types
│       │   └── utils/          # Utilities
│       ├── contracts/          # Smart contracts
│       │   └── AnonymousFoodSafety.sol
│       ├── scripts/            # Deployment scripts
│       └── README.md
│
├── demo.mp4                    # Demo video
├── package.json                # Root package.json
└── README.md                   # This file
```

## Examples

### 1. Next.js Application (Required Demo)

A complete Next.js app showcasing the SDK with:
- Wallet connection
- FHEVM initialization
- Value encryption
- Result display

**Location**: `examples/nextjs-app/`

**Run**:
```bash
cd examples/nextjs-app
npm install
npm run dev
```

Visit `http://localhost:3000`

### 2. React Example

A basic React application demonstrating SDK integration:
- Wallet connection with MetaMask
- Data encryption using FHEVM
- Data decryption with EIP-712 signatures
- Clean, modern UI with TypeScript

**Location**: `examples/react-example/`

**Run**:
```bash
cd examples/react-example
npm install
npm run dev
```

Visit `http://localhost:3001`

### 3. Food Safety Reporter (Complete React dApp)

A privacy-preserving food safety reporting platform demonstrating:
- Anonymous report submission (now in React!)
- Encrypted sensitive data (safety levels, locations, food types)
- Role-based access control
- Investigation workflow
- Statistical queries

**Location**: `examples/food-safety-reporter/`

**Features**:
- Smart contract with FHE types (`euint8`, `euint32`, `eaddress`)
- Full React application with SDK integration
- Complete workflow from submission to resolution
- Modern UI with hooks and context

**Run**:
```bash
cd examples/food-safety-reporter
npm install
npm run dev
```

Visit `http://localhost:3000`

## SDK Features

### Core Features

#### Encryption

```javascript
// Single value encryption
import { encryptU8, encryptU32, encryptBool, encryptAddress } from '@fhevm/sdk';

const encrypted8 = await encryptU8(instance, 42, options);
const encrypted32 = await encryptU32(instance, 1000, options);
const encryptedBool = await encryptBool(instance, true, options);
const encryptedAddr = await encryptAddress(instance, '0x...', options);
```

#### Multiple Values

```javascript
// Build encrypted input with multiple values
import { prepareEncryptedInput } from '@fhevm/sdk';

const { handles, inputProof } = await prepareEncryptedInput(
  instance,
  (input) => {
    input.add8(42);
    input.add32(1000);
    input.addBool(true);
  },
  { contractAddress, userAddress }
);
```

#### Decryption

```javascript
// Decrypt with user's private key (userDecrypt)
import { decryptU32 } from '@fhevm/sdk';

const value = await decryptU32(instance, handle, signer, {
  contractAddress: '0x...',
  userAddress: '0x...'
});
```

### React Features

#### Hooks

- `useFhevmContext()` - Access FHEVM instance
- `useEncrypt()` - Encrypt data
- `useDecrypt()` - Decrypt data
- `useEncryptedInput()` - Build multi-value inputs
- `useFhevmStatus()` - Check initialization status

#### Provider

```tsx
<FhevmProvider
  config={{
    networkUrl: 'https://devnet.zama.ai',
    gatewayUrl: 'https://gateway.zama.ai'
  }}
>
  <App />
</FhevmProvider>
```

## Installation & Setup

### From Root (Monorepo Setup)

```bash
# Install all dependencies
npm install

# Build SDK
cd packages/fhevm-sdk
npm run build

# Run Next.js example
cd ../../examples/nextjs-app
npm run dev
```

### In Your Own Project

```bash
# Install dependencies
npm install @fhevm/sdk fhevmjs ethers

# Import and use
import { createFhevmClient } from '@fhevm/sdk';
```

## Configuration

The SDK accepts the following configuration:

```typescript
interface FhevmConfig {
  networkUrl: string;        // Required: FHEVM network URL
  gatewayUrl?: string;       // Optional: Gateway URL for decryption
  publicKey?: string;        // Optional: Network public key
  aclAddress?: string;       // Optional: ACL contract address
  network?: {
    chainId: number;
    name: string;
  };
}
```

## Documentation

### SDK Documentation

Detailed SDK documentation is available in [`packages/fhevm-sdk/README.md`](./packages/fhevm-sdk/README.md)

### API Reference

- **Core**: Client initialization, encryption, decryption
- **React**: Hooks, context provider
- **Utils**: Helper functions, type definitions

### Examples

Each example includes its own README with setup instructions:

- [Next.js Example](./examples/nextjs-app/README.md)
- [Food Safety Reporter](./examples/food-safety-reporter/README.md)

## Development

### Build SDK

```bash
cd packages/fhevm-sdk
npm install
npm run build
```

### Run Tests

```bash
npm test
```

### Development Mode

```bash
npm run dev
```

## Evaluation Criteria Addressed

### ✅ Usability

- **< 10 lines of code** to get started
- **Minimal boilerplate** required
- **Sensible defaults** provided
- **Clear error messages**

### ✅ Completeness

- **Full FHEVM workflow**: Initialize → Encrypt → Decrypt → Contract interaction
- **All data types**: `euint8`, `euint16`, `euint32`, `euint64`, `ebool`, `eaddress`
- **Both decrypt methods**: `userDecrypt` (EIP-712 signature) and `publicDecrypt`
- **Contract integration**: Complete examples with smart contracts

### ✅ Reusability

- **Framework agnostic** core
- **Modular API** structure
- **React adapters** (hooks/provider)
- **Clean abstractions** for different use cases

### ✅ Documentation

- **Comprehensive README** files
- **Code examples** for each feature
- **TypeScript definitions** with JSDoc
- **Step-by-step guides**

### ✅ Creativity (Bonus)

- **Multiple environments**: Next.js, React, Node.js examples
- **Real-world use case**: Food safety reporting platform
- **Developer experience**: wagmi-like API design
- **Complete dApp**: Smart contract + frontend integration

## Technical Stack

- **Core**: TypeScript, fhevmjs, ethers.js
- **React**: React 18, React Context, Hooks
- **Build**: Rollup, TypeScript compiler
- **Examples**: Next.js 14, Hardhat

## Deployment

### Deploy SDK Package

```bash
cd packages/fhevm-sdk
npm run build
npm publish
```

### Deploy Examples

See individual example READMEs for deployment instructions.

## Video Demo

Watch the [demo.mp4](./demo.mp4) video to see:

1. SDK installation and setup
2. Next.js example walkthrough
3. Food safety reporter demo
4. Encryption and decryption in action

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Resources

- **Zama FHEVM Docs**: https://docs.zama.ai/fhevm
- **fhevmjs**: https://github.com/zama-ai/fhevmjs
- **Ethers.js**: https://docs.ethers.org
- **Next.js**: https://nextjs.org/docs

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Support

For issues, questions, or feedback:

- GitHub Issues: [Report bugs or request features]
- Discussions: [Join the conversation]

---

**Built for developers, powered by Fully Homomorphic Encryption.**

*Making confidential computing accessible to everyone.*
