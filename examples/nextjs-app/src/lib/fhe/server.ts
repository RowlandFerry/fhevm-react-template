/**
 * Server-side FHE operations
 * Functions for handling FHE operations on the server
 */

import { createFhevmClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

/**
 * Initialize FHEVM client for server environment
 */
export async function initializeServerFhevmClient(
  networkUrl: string,
  gatewayUrl?: string
) {
  const client = createFhevmClient({
    networkUrl,
    gatewayUrl
  });

  const provider = new JsonRpcProvider(networkUrl);
  await client.init(provider);

  return client;
}

/**
 * Server-side encryption helper
 */
export async function serverEncrypt(
  value: number,
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64',
  networkUrl: string,
  contractAddress: string,
  userAddress: string
) {
  const client = await initializeServerFhevmClient(networkUrl);
  const instance = client.getInstance();

  // Create encrypted input
  const input = instance.createEncryptedInput(contractAddress, userAddress);

  switch (type) {
    case 'uint8':
      input.add8(value);
      break;
    case 'uint16':
      input.add16(value);
      break;
    case 'uint32':
      input.add32(value);
      break;
    case 'uint64':
      input.add64(value);
      break;
  }

  return input.encrypt();
}
