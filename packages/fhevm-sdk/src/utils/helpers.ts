/**
 * Helper utilities for FHEVM SDK
 */

import type { BrowserProvider } from 'ethers';

/**
 * Check if MetaMask or compatible wallet is available
 */
export function isWalletAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

/**
 * Get Ethereum provider from window
 */
export function getWindowProvider(): any {
  if (!isWalletAvailable()) {
    throw new Error('No Ethereum wallet detected');
  }
  return window.ethereum;
}

/**
 * Request account access from wallet
 */
export async function requestAccounts(): Promise<string[]> {
  const provider = getWindowProvider();
  return provider.request({ method: 'eth_requestAccounts' });
}

/**
 * Get current chain ID
 */
export async function getChainId(): Promise<number> {
  const provider = getWindowProvider();
  const chainId = await provider.request({ method: 'eth_chainId' });
  return parseInt(chainId, 16);
}

/**
 * Switch to a specific chain
 */
export async function switchChain(chainId: number): Promise<void> {
  const provider = getWindowProvider();
  const chainIdHex = `0x${chainId.toString(16)}`;

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      throw new Error(`Chain ${chainId} is not configured in your wallet`);
    }
    throw error;
  }
}

/**
 * Format encrypted handle for display
 */
export function formatHandle(handle: bigint): string {
  const hex = handle.toString(16);
  return `0x${hex.padStart(64, '0')}`;
}

/**
 * Parse handle from string
 */
export function parseHandle(handleString: string): bigint {
  return BigInt(handleString);
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!isValidAddress(address)) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Wait for transaction confirmation
 */
export async function waitForTransaction(
  provider: BrowserProvider,
  txHash: string,
  confirmations = 1
): Promise<any> {
  const tx = await provider.getTransaction(txHash);
  if (!tx) throw new Error('Transaction not found');
  return tx.wait(confirmations);
}

/**
 * Format gas price for display
 */
export function formatGasPrice(gasPrice: bigint): string {
  const gwei = Number(gasPrice) / 1e9;
  return `${gwei.toFixed(2)} Gwei`;
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry async operation with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await sleep(delayMs * Math.pow(2, attempt - 1));
      }
    }
  }

  throw lastError || new Error('Retry failed');
}
