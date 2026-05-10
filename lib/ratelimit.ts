// Simple in-memory rate limiter
// For production with multiple servers, use Redis-based solution

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the interval
}

export function rateLimit(identifier: string, config: RateLimitConfig): {
  success: boolean;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Initialize or get existing entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + config.interval,
    };
  }

  const entry = store[key];
  entry.count++;

  const remaining = Math.max(0, config.maxRequests - entry.count);
  const success = entry.count <= config.maxRequests;

  return {
    success,
    remaining,
    reset: entry.resetTime,
  };
}

// Helper to get client identifier (IP address)
// Works with Cloudflare proxy, other proxies, and direct connections
export function getClientIdentifier(request: Request): string {
  // Priority 1: Cloudflare-specific header (most reliable when using Cloudflare)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Priority 2: X-Forwarded-For (standard proxy header)
  // This can contain multiple IPs (client, proxy1, proxy2)
  // The first IP is the original client
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp && firstIp !== 'unknown') {
      return firstIp;
    }
  }

  // Priority 3: X-Real-IP (used by nginx and some proxies)
  const realIp = request.headers.get('x-real-ip');
  if (realIp && realIp !== 'unknown') {
    return realIp;
  }

  // Priority 4: True-Client-IP (Cloudflare Enterprise)
  const trueClientIp = request.headers.get('true-client-ip');
  if (trueClientIp) {
    return trueClientIp;
  }

  // Priority 5: Direct connection (no proxy)
  // Next.js provides this in various ways
  const url = new URL(request.url);
  const host = request.headers.get('host') || url.hostname;
  
  // For development/localhost
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'localhost';
  }

  // Fallback: Use a combination of headers to create unique identifier
  // This ensures rate limiting still works even if we can't get exact IP
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Create a hash-like identifier from available headers
  const fallbackId = `fallback-${userAgent.slice(0, 20)}-${acceptLanguage.slice(0, 10)}`;
  
  return fallbackId;
}

// Preset configurations
export const RateLimitPresets = {
  // Very strict - 3 requests per 15 minutes
  strict: {
    interval: 15 * 60 * 1000,
    maxRequests: 3,
  },
  // Standard - 5 requests per 10 minutes
  standard: {
    interval: 10 * 60 * 1000,
    maxRequests: 5,
  },
  // Relaxed - 10 requests per 5 minutes
  relaxed: {
    interval: 5 * 60 * 1000,
    maxRequests: 10,
  },
  // For testing - 5 requests per minute
  development: {
    interval: 60 * 1000,
    maxRequests: 5,
  },
};
