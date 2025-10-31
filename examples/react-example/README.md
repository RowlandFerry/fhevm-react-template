# React Example - FHEVM SDK

A basic React application demonstrating the use of `@fhevm/sdk` for Fully Homomorphic Encryption.

## Features

- Wallet connection with MetaMask
- Data encryption using FHEVM
- Data decryption with EIP-712 signatures
- Clean, modern UI
- TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
npm run build
```

## Usage

### 1. Connect Wallet

Click the "Connect Wallet" button to connect your MetaMask wallet.

### 2. Encrypt Data

- Select the data type (uint8, uint16, uint32, uint64, or bool)
- Enter a value to encrypt
- Click "Encrypt Data"
- The encrypted handle and input proof will be displayed

### 3. Decrypt Data

- Select the data type
- Enter an encrypted handle (from blockchain)
- Click "Decrypt Data"
- Sign the EIP-712 message
- The decrypted value will be displayed

## SDK Usage

This example demonstrates the key features of `@fhevm/sdk`:

```typescript
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/sdk'

// Wrap your app with FhevmProvider
<FhevmProvider config={config} provider={provider}>
  <App />
</FhevmProvider>

// Use hooks in components
const { encrypt, isLoading } = useEncrypt()
const { decrypt } = useDecrypt()
```

## Learn More

- [FHEVM SDK Documentation](../../README.md)
- [Zama Documentation](https://docs.zama.ai)
