# Next.js FHEVM Example

This is a Next.js application demonstrating the @fhevm/sdk for building confidential frontends.

## Features

- Connect MetaMask wallet
- Initialize FHEVM instance
- Encrypt values using React hooks
- Clean, modern UI

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Connect your MetaMask wallet and try encrypting values!

## How It Works

This example uses the @fhevm/sdk to:

1. **Initialize FHEVM**: The `FhevmProvider` wraps the app and manages the FHEVM instance
2. **Connect Wallet**: Uses ethers.js to connect to MetaMask
3. **Encrypt Data**: The `useEncrypt` hook provides a simple interface for encryption
4. **Display Results**: Shows encrypted handles and input proofs

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)
