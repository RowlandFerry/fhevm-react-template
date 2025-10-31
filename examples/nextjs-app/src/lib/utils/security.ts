/**
 * Security utility functions
 */

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate numeric input
 */
export function isValidNumber(value: string, min?: number, max?: number): boolean {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
}

/**
 * Check if value is within uint bounds
 */
export function isWithinUintBounds(value: number, bits: 8 | 16 | 32 | 64): boolean {
  if (value < 0) return false;

  const maxValues = {
    8: 255,
    16: 65535,
    32: 4294967295,
    64: Number.MAX_SAFE_INTEGER
  };

  return value <= maxValues[bits];
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address || address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Mask sensitive data
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars * 2) return data;
  const start = data.slice(0, visibleChars);
  const end = data.slice(-visibleChars);
  const masked = '*'.repeat(Math.min(data.length - visibleChars * 2, 10));
  return `${start}${masked}${end}`;
}
