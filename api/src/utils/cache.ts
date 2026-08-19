/**
 * In-memory duplicate protection cache.
 * Note: This cache is in-memory and specific to the individual container/instance.
 * For distributed production environments, use a shared cache store (like Azure Redis) 
 * or API Management rate-limiting rules.
 */

interface CacheEntry {
  timestamp: number;
}

const duplicateCache = new Map<string, CacheEntry>();
const CACHE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Creates a unique composite key from email and company.
 */
function createCacheKey(email: string, company: string): string {
  return `${email.trim().toLowerCase()}:${company.trim().toLowerCase()}`;
}

/**
 * Checks if a submission is a duplicate within the cache window.
 * If not a duplicate, registers the submission timestamp.
 */
export function isDuplicateSubmission(email: string, company: string): boolean {
  const key = createCacheKey(email, company);
  const now = Date.now();
  
  // Clean up expired cache items first to avoid memory leaks
  cleanupCache(now);

  const entry = duplicateCache.get(key);

  if (entry) {
    // If within the 5-minute window, block
    if (now - entry.timestamp < CACHE_WINDOW_MS) {
      console.warn(`[API] Duplicate submission blocked for: ${key}. Time remaining: ${Math.round((CACHE_WINDOW_MS - (now - entry.timestamp)) / 1000)}s`);
      return true;
    }
  }

  return false;
}

/**
 * Registers a successful submission in the duplicate cache.
 */
export function registerSubmission(email: string, company: string): void {
  const key = createCacheKey(email, company);
  duplicateCache.set(key, { timestamp: Date.now() });
}

/**
 * Clears expired cache entries.
 */
function cleanupCache(now: number): void {
  for (const [key, entry] of duplicateCache.entries()) {
    if (now - entry.timestamp >= CACHE_WINDOW_MS) {
      duplicateCache.delete(key);
    }
  }
}
