# Food Safety Reporter

A privacy-preserving food safety reporting platform built with the FHEVM SDK.

## Overview

This example demonstrates a complete dApp using the @fhevm/sdk for:

- **Anonymous Reporting**: Submit food safety concerns with complete privacy
- **Encrypted Data**: All sensitive information protected by FHE
- **Investigator Management**: Controlled access to encrypted reports
- **Status Tracking**: Monitor investigation progress

## Features

- Privacy-preserving anonymous reporting
- Fully encrypted sensitive data (safety levels, locations, food types)
- Role-based access control (Owner, Regulator, Investigator)
- Complete investigation workflow
- Statistical queries without revealing individual reports

## Smart Contract

The `AnonymousFoodSafety.sol` contract uses:

- **FHE Types**: `euint8`, `euint32`, `eaddress` for encrypted data
- **Access Control**: Three-tier permission system
- **Event System**: Transparent activity logging
- **Statistical Functions**: Privacy-preserving aggregate queries

## Installation

```bash
npm install
```

## Usage

### Compile Contract

```bash
npm run compile
```

### Deploy

```bash
# Local network
npm run deploy:local

# Sepolia testnet
npm run deploy:sepolia
```

### Configure Environment

Copy `.env.example` to `.env` and add your configuration:

```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_rpc_url
CONTRACT_ADDRESS=deployed_contract_address
```

## Integration with FHEVM SDK

This example shows how to integrate the SDK with a real smart contract:

```javascript
import { createFhevmClient, prepareEncryptedInput } from '@fhevm/sdk';

// Initialize SDK
const client = createFhevmClient({
  networkUrl: process.env.FHEVM_NETWORK_URL,
  gatewayUrl: process.env.FHEVM_GATEWAY_URL
});

await client.init(provider);
const instance = client.getInstance();

// Encrypt multiple values for report submission
const { handles, inputProof } = await prepareEncryptedInput(
  instance,
  (input) => {
    input.add8(safetyLevel);      // Safety level (0-4)
    input.add32(locationCode);    // Location code
    input.add32(foodTypeCode);    // Food type code
  },
  { contractAddress, userAddress }
);

// Submit to contract
await contract.submitAnonymousReport(
  handles,
  inputProof,
  description
);
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Smart Contract Source](./contracts/AnonymousFoodSafety.sol)
