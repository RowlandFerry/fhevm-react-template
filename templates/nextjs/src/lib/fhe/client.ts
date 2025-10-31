/**
 * Client-side FHE operations
 * Wrapper functions for common client-side FHEVM operations
 */

import { createFhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

/**
 * Initialize FHEVM client for browser environment
 */
export async function initializeFhevmClient(
  networkUrl: string = 'https://devnet.zama.ai',
  gatewayUrl?: string
) {
  const client = createFhevmClient({
    networkUrl,
    gatewayUrl
  });

  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new BrowserProvider(window.ethereum);
    await client.init(provider);
  }

  return client;
}

/**
 * Get provider from MetaMask
 */
export async function getWeb3Provider(): Promise<BrowserProvider | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  return new BrowserProvider(window.ethereum);
}

/**
 * Request account access from MetaMask
 */
export async function requestAccounts(): Promise<string[]> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask not installed');
  }

  const provider = new BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  return accounts;
}

/**
 * Get current connected account
 */
export async function getCurrentAccount(): Promise<string | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_accounts', []);
  return accounts[0] || null;
}
