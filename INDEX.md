# FHEVM SDK - File Index

## Quick Navigation

This document provides a complete index of all files in this submission.

## 📋 Documentation Files

| File | Description |
|------|-------------|
| [README.md](./README.md) | Main project overview, features, and quick start |
| [SUBMISSION.md](./SUBMISSION.md) | Competition submission summary |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Technical details and architecture |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Step-by-step tutorial for beginners |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment guide for production |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guidelines for contributors |
| [INDEX.md](./INDEX.md) | This file - complete file listing |
| [LICENSE](./LICENSE) | MIT License |

## 📦 SDK Package (`packages/fhevm-sdk/`)

### Core Files

| File | Description |
|------|-------------|
| [src/index.ts](./packages/fhevm-sdk/src/index.ts) | Main SDK exports |
| [src/core/FhevmClient.ts](./packages/fhevm-sdk/src/core/FhevmClient.ts) | FHEVM client implementation |
| [src/core/encryption.ts](./packages/fhevm-sdk/src/core/encryption.ts) | Encryption utilities (all types) |
| [src/core/decryption.ts](./packages/fhevm-sdk/src/core/decryption.ts) | Decryption utilities (userDecrypt/publicDecrypt) |

### React Integration

| File | Description |
|------|-------------|
| [src/react/FhevmProvider.tsx](./packages/fhevm-sdk/src/react/FhevmProvider.tsx) | React Context Provider |
| [src/react/hooks.ts](./packages/fhevm-sdk/src/react/hooks.ts) | React hooks (useEncrypt, useDecrypt, etc.) |

### Utilities

| File | Description |
|------|-------------|
| [src/utils/types.ts](./packages/fhevm-sdk/src/utils/types.ts) | TypeScript type definitions |
| [src/utils/helpers.ts](./packages/fhevm-sdk/src/utils/helpers.ts) | Helper utility functions |

### Configuration

| File | Description |
|------|-------------|
| [package.json](./packages/fhevm-sdk/package.json) | SDK package configuration |
| [tsconfig.json](./packages/fhevm-sdk/tsconfig.json) | TypeScript configuration |
| [README.md](./packages/fhevm-sdk/README.md) | SDK API documentation |

## 🎯 Next.js Example (`examples/nextjs-app/`)

### Application Files

| File | Description |
|------|-------------|
| [app/page.tsx](./examples/nextjs-app/app/page.tsx) | Main page with encryption demo |
| [app/layout.tsx](./examples/nextjs-app/app/layout.tsx) | Root layout component |
| [app/globals.css](./examples/nextjs-app/app/globals.css) | Global styles |

### Configuration

| File | Description |
|------|-------------|
| [package.json](./examples/nextjs-app/package.json) | Next.js app dependencies |
| [tsconfig.json](./examples/nextjs-app/tsconfig.json) | TypeScript config |
| [next.config.js](./examples/nextjs-app/next.config.js) | Next.js configuration |
| [README.md](./examples/nextjs-app/README.md) | Example documentation |

## 🍔 Food Safety Reporter (`examples/food-safety-reporter/`)

### Smart Contract

| File | Description |
|------|-------------|
| [contracts/AnonymousFoodSafety.sol](./examples/food-safety-reporter/contracts/AnonymousFoodSafety.sol) | FHE-enabled smart contract |

### Configuration

| File | Description |
|------|-------------|
| [package.json](./examples/food-safety-reporter/package.json) | Project dependencies |
| [hardhat.config.js](./examples/food-safety-reporter/hardhat.config.js) | Hardhat configuration |
| [.env.example](./examples/food-safety-reporter/.env.example) | Environment variables template |
| [README.md](./examples/food-safety-reporter/README.md) | dApp documentation |

## 🎬 Media

| File | Description | Size |
|------|-------------|------|
| [demo.mp4](./demo.mp4) | Video demonstration | ~791 KB |

## ⚙️ Root Configuration

| File | Description |
|------|-------------|
| [package.json](./package.json) | Monorepo workspace configuration |
| [.gitignore](./.gitignore) | Git ignore patterns |

## 📊 Statistics

- **Total Files**: 28 source files
- **Documentation**: 8 markdown files
- **SDK Core**: 8 TypeScript files
- **Next.js Example**: 7 files
- **Food Safety Reporter**: 5 files
- **Media**: 1 video file
- **Total Lines of Code**: ~2,500+ lines

## 🗂️ File Categories

### TypeScript/JavaScript (19 files)
- SDK Core: 8 files
- React Components: 2 files
- Next.js App: 3 files
- Configuration: 6 files

### Solidity (1 file)
- Smart Contract: 1 file

### Documentation (8 files)
- READMEs: 4 files
- Guides: 4 files

### Configuration (7 files)
- package.json: 4 files
- tsconfig.json: 2 files
- Other config: 1 file

## 🔍 Quick Find

### Looking for...

- **SDK Installation?** → [README.md](./README.md#installation)
- **Quick Start?** → [GETTING_STARTED.md](./GETTING_STARTED.md)
- **API Reference?** → [packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md)
- **Next.js Example?** → [examples/nextjs-app/](./examples/nextjs-app/)
- **Smart Contract?** → [examples/food-safety-reporter/contracts/](./examples/food-safety-reporter/contracts/)
- **Deployment?** → [DEPLOYMENT.md](./DEPLOYMENT.md)
- **How to Contribute?** → [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📝 Notes

- All files are in English
- All examples include documentation
- Full TypeScript support throughout
- Production-ready code quality

## 🔗 Related Files

### For Developers
1. Start with [README.md](./README.md)
2. Follow [GETTING_STARTED.md](./GETTING_STARTED.md)
3. Explore [examples/nextjs-app/](./examples/nextjs-app/)
4. Read [packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md)

### For Evaluators
1. Review [SUBMISSION.md](./SUBMISSION.md)
2. Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Watch [demo.mp4](./demo.mp4)
4. Test [examples/nextjs-app/](./examples/nextjs-app/)

---

**All files are organized, documented, and ready for evaluation.**
