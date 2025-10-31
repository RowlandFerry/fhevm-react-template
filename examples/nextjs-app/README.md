# FHEVM Next.js Example Application

A comprehensive Next.js 14 application demonstrating the integration of the `@fhevm/sdk` for Fully Homomorphic Encryption operations.

## Features

This example application showcases:

- **🔐 Encryption Demo**: Encrypt values of different types (uint8, uint16, uint32, uint64)
- **⚡ Computation Demo**: Perform homomorphic operations on encrypted data
- **🔑 Key Management**: View and manage FHE network keys
- **💰 Banking Example**: Private financial transactions with encrypted amounts
- **🏥 Medical Example**: HIPAA-compliant medical records with FHE encryption

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main application page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── api/                 # API routes
│       ├── fhe/             # FHE operations
│       │   ├── route.ts
│       │   ├── encrypt/route.ts
│       │   ├── decrypt/route.ts
│       │   └── compute/route.ts
│       └── keys/route.ts
│
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                 # FHE-specific components
│   │   ├── FHEProvider.tsx
│   │   ├── EncryptionDemo.tsx
│   │   ├── ComputationDemo.tsx
│   │   └── KeyManager.tsx
│   └── examples/            # Example use cases
│       ├── BankingExample.tsx
│       └── MedicalExample.tsx
│
├── lib/                     # Utility libraries
│   ├── fhe/                 # FHE utilities
│   │   ├── client.ts        # Client-side FHE operations
│   │   ├── server.ts        # Server-side FHE operations
│   │   ├── keys.ts          # Key management
│   │   └── types.ts         # Type definitions
│   └── utils/               # Helper functions
│       ├── security.ts      # Security utilities
│       └── validation.ts    # Validation functions
│
├── hooks/                   # Custom React hooks
│   ├── useFHE.ts           # Combined FHE hook
│   ├── useEncryption.ts    # Encryption hook
│   └── useComputation.ts   # Computation hook
│
└── types/                   # TypeScript definitions
    ├── fhe.ts              # FHE-related types
    └── api.ts              # API types
```

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or another Web3 wallet
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Build the SDK (if not already built):

```bash
cd ../../packages/fhevm-sdk
npm run build
cd ../../examples/nextjs-app
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Connect Wallet**: Click the "Connect Wallet" button in the header
2. **Wait for Initialization**: The FHEVM SDK will initialize automatically
3. **Explore Features**: Use the tabs to navigate between different demos:
   - **Encryption**: Basic encryption functionality
   - **Computation**: Homomorphic computations
   - **Keys**: View network configuration
   - **Banking**: Financial transaction example
   - **Medical**: Healthcare data example

## SDK Integration

This application uses the `@fhevm/sdk` package:

```typescript
import { FhevmProvider, useEncrypt, useFhevmStatus } from '@fhevm/sdk';

// Wrap your app with the provider
<FhevmProvider config={{ networkUrl: 'https://devnet.zama.ai' }}>
  <App />
</FhevmProvider>

// Use hooks in components
function MyComponent() {
  const { encrypt } = useEncrypt();
  const { isReady } = useFhevmStatus();

  // Encrypt a value
  const result = await encrypt(42, 'uint32', {
    contractAddress: '0x...',
    userAddress: '0x...'
  });
}
```

## API Routes

The application includes several API routes for server-side operations:

- `GET /api/fhe` - FHE operations info
- `POST /api/fhe/encrypt` - Encrypt data
- `POST /api/fhe/decrypt` - Decrypt data
- `POST /api/fhe/compute` - Perform computations
- `GET /api/keys` - Key management

## Components

### UI Components

- **Button**: Styled button with loading states
- **Input**: Form input with validation
- **Card**: Container component for content

### FHE Components

- **FHEProvider**: Context provider wrapper
- **EncryptionDemo**: Interactive encryption demonstration
- **ComputationDemo**: Homomorphic computation showcase
- **KeyManager**: Network key management

### Example Components

- **BankingExample**: Private financial transactions
- **MedicalExample**: Confidential medical records

## Development

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **@fhevm/sdk**: FHEVM SDK integration
- **Tailwind CSS**: Styling
- **ethers.js**: Ethereum interactions

## Environment Configuration

The application is configured to use:

- **Network URL**: `https://devnet.zama.ai`
- **Gateway URL**: `https://gateway.zama.ai`

You can modify these in the `FhevmProvider` configuration in `src/app/page.tsx`.

## Learn More

- [@fhevm/sdk Documentation](../../packages/fhevm-sdk/README.md)
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
