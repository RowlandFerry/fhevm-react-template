/**
 * Core FHEVM Client
 *
 * Main class for managing FHEVM instance lifecycle and operations.
 */

import { createInstance, FhevmInstance, initFhevm } from 'fhevmjs';
import type { BrowserProvider, Signer } from 'ethers';

export interface FhevmConfig {
  networkUrl: string;
  gatewayUrl?: string;
  network?: {
    chainId: number;
    name: string;
  };
  publicKey?: string;
  aclAddress?: string;
}

export interface FhevmClientState {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  publicKey: string | null;
  chainId: number | null;
}

/**
 * FhevmClient - Main SDK client for managing FHEVM operations
 *
 * @example
 * ```typescript
 * const client = new FhevmClient({
 *   networkUrl: 'https://devnet.zama.ai',
 *   gatewayUrl: 'https://gateway.zama.ai'
 * });
 *
 * await client.init(provider);
 * const instance = client.getInstance();
 * ```
 */
export class FhevmClient {
  private state: FhevmClientState = {
    instance: null,
    isInitialized: false,
    publicKey: null,
    chainId: null,
  };

  constructor(private config: FhevmConfig) {}

  /**
   * Initialize FHEVM instance
   *
   * @param provider - Ethers provider (BrowserProvider or custom)
   * @returns Initialized FhevmInstance
   */
  async init(provider: BrowserProvider): Promise<FhevmInstance> {
    if (this.state.isInitialized && this.state.instance) {
      return this.state.instance;
    }

    // Initialize fhevmjs library
    await initFhevm();

    const network = await provider.getNetwork();
    const signer = await provider.getSigner();

    // Create FHEVM instance with public key
    const instance = await createInstance({
      chainId: Number(network.chainId),
      publicKey: this.config.publicKey,
      gatewayUrl: this.config.gatewayUrl,
      aclAddress: this.config.aclAddress,
    });

    this.state = {
      instance,
      isInitialized: true,
      publicKey: this.config.publicKey || null,
      chainId: Number(network.chainId),
    };

    return instance;
  }

  /**
   * Get current FHEVM instance
   *
   * @throws Error if instance not initialized
   */
  getInstance(): FhevmInstance {
    if (!this.state.instance) {
      throw new Error('FHEVM instance not initialized. Call init() first.');
    }
    return this.state.instance;
  }

  /**
   * Check if instance is initialized
   */
  isReady(): boolean {
    return this.state.isInitialized;
  }

  /**
   * Get current state
   */
  getState(): FhevmClientState {
    return { ...this.state };
  }

  /**
   * Reset instance (useful for testing or network changes)
   */
  reset(): void {
    this.state = {
      instance: null,
      isInitialized: false,
      publicKey: null,
      chainId: null,
    };
  }
}

/**
 * Factory function to create FhevmClient instance
 *
 * @example
 * ```typescript
 * const client = createFhevmClient({
 *   networkUrl: 'https://devnet.zama.ai'
 * });
 * ```
 */
export function createFhevmClient(config: FhevmConfig): FhevmClient {
  return new FhevmClient(config);
}
