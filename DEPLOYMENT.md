# Deployment Guide

This guide covers deploying the FHEVM SDK and example applications.

## Table of Contents

1. [Publishing the SDK](#publishing-the-sdk)
2. [Deploying Smart Contracts](#deploying-smart-contracts)
3. [Deploying Frontend Applications](#deploying-frontend-applications)
4. [Environment Configuration](#environment-configuration)

## Publishing the SDK

### Prepare for Publication

1. **Build the SDK**

```bash
cd packages/fhevm-sdk
npm run build
```

2. **Test the Build**

```bash
# Link locally for testing
npm link

# Test in an example project
cd ../../examples/nextjs-app
npm link @fhevm/sdk
npm run dev
```

3. **Update Version**

```bash
# Update version in package.json
npm version patch  # or minor, major
```

4. **Publish to npm**

```bash
npm publish --access public
```

### Using Published SDK

After publishing, users can install:

```bash
npm install @fhevm/sdk
```

## Deploying Smart Contracts

### Prerequisites

- Ethereum wallet with testnet ETH
- RPC URL (Alchemy, Infura, etc.)
- Etherscan API key (for verification)

### Deploy to Sepolia Testnet

1. **Configure Environment**

Create `.env` in your contract directory:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. **Compile Contracts**

```bash
cd examples/food-safety-reporter
npm run compile
```

3. **Deploy**

```bash
npm run deploy:sepolia
```

4. **Verify on Etherscan**

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

5. **Save Contract Address**

Update `.env` with deployed address:

```env
CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## Deploying Frontend Applications

### Next.js Example Deployment

#### Option 1: Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**

- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure build settings:
  - Framework: Next.js
  - Root Directory: `examples/nextjs-app`
  - Build Command: `npm run build`
  - Output Directory: `.next`

3. **Set Environment Variables**

In Vercel dashboard, add:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYour...
NEXT_PUBLIC_FHEVM_NETWORK_URL=https://devnet.zama.ai
NEXT_PUBLIC_FHEVM_GATEWAY_URL=https://gateway.zama.ai
```

4. **Deploy**

Vercel will automatically deploy on each push.

#### Option 2: Netlify

1. **Build the Application**

```bash
cd examples/nextjs-app
npm run build
```

2. **Deploy**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Option 3: Custom Server

1. **Build**

```bash
npm run build
```

2. **Start Production Server**

```bash
npm start
```

3. **Use PM2 for Process Management**

```bash
npm install -g pm2
pm2 start npm --name "fhevm-app" -- start
pm2 save
pm2 startup
```

### Static Site Deployment (GitHub Pages)

If you have a static version:

1. **Build Static Site**

```bash
npm run build
npm run export
```

2. **Deploy to GitHub Pages**

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d out
```

## Environment Configuration

### Development Environment

Create `.env.local`:

```env
# Network Configuration
NEXT_PUBLIC_FHEVM_NETWORK_URL=https://devnet.zama.ai
NEXT_PUBLIC_FHEVM_GATEWAY_URL=https://gateway.zama.ai

# Contract Address (update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=Sepolia
```

### Production Environment

For production, use environment variables:

- **Vercel**: Set in project settings
- **Netlify**: Set in site settings
- **Custom**: Use `.env.production`

## Post-Deployment Checklist

- [ ] Smart contract deployed and verified
- [ ] Contract address updated in frontend
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] SSL/HTTPS enabled
- [ ] MetaMask connection tested
- [ ] Encryption/decryption tested
- [ ] Error handling verified

## Monitoring & Maintenance

### Monitor Contract

- Use Etherscan to monitor transactions
- Set up alerts for contract events
- Track gas usage

### Monitor Frontend

- Set up error tracking (Sentry, etc.)
- Monitor performance (Vercel Analytics, etc.)
- Track user interactions

### Updates

- Keep dependencies updated
- Monitor for SDK updates
- Test thoroughly before deploying updates

## Troubleshooting

### Contract Deployment Fails

**Issue**: Insufficient funds

**Solution**: Ensure wallet has enough testnet ETH. Get from faucet:
- Sepolia: https://sepoliafaucet.com

**Issue**: RPC errors

**Solution**: Check RPC URL is correct and API key is valid

### Frontend Build Fails

**Issue**: Module not found

**Solution**: Run `npm install` in the correct directory

**Issue**: Webpack errors in Next.js

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

### Runtime Errors

**Issue**: "Cannot read property of undefined"

**Solution**: Ensure FHEVM is initialized before use:

```javascript
const { isReady } = useFhevmStatus();
if (!isReady) return <Loading />;
```

## Support

For deployment issues:

- Check [GitHub Issues](https://github.com/yourusername/fhevm-sdk/issues)
- Review [Documentation](./README.md)
- Ask in [Discussions](https://github.com/yourusername/fhevm-sdk/discussions)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Hardhat Deployment](https://hardhat.org/guides/deploying.html)
- [Etherscan Verification](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)
