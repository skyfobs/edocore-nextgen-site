// Debug utility to see what IP and headers are being detected
// Use this to verify your setup works correctly

export function debugIPHeaders(request: Request): {
  detectedIp: string;
  headers: Record<string, string | null>;
  recommendation: string;
} {
  const headers = {
    'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
    'x-forwarded-for': request.headers.get('x-forwarded-for'),
    'x-real-ip': request.headers.get('x-real-ip'),
    'true-client-ip': request.headers.get('true-client-ip'),
    'host': request.headers.get('host'),
    'user-agent': request.headers.get('user-agent')?.slice(0, 50) || null,
  };

  let detectedIp = 'unknown';
  let recommendation = '';

  // Cloudflare
  if (headers['cf-connecting-ip']) {
    detectedIp = headers['cf-connecting-ip'];
    recommendation = '✅ Cloudflare detected - using CF-Connecting-IP (most reliable)';
  }
  // Standard proxy
  else if (headers['x-forwarded-for']) {
    detectedIp = headers['x-forwarded-for'].split(',')[0].trim();
    recommendation = '✅ Proxy detected - using X-Forwarded-For';
  }
  // Nginx proxy
  else if (headers['x-real-ip']) {
    detectedIp = headers['x-real-ip'];
    recommendation = '✅ Nginx proxy detected - using X-Real-IP';
  }
  // Cloudflare Enterprise
  else if (headers['true-client-ip']) {
    detectedIp = headers['true-client-ip'];
    recommendation = '✅ Cloudflare Enterprise - using True-Client-IP';
  }
  // Direct connection
  else if (headers['host']?.includes('localhost')) {
    detectedIp = 'localhost';
    recommendation = '⚠️ Development mode - using localhost identifier';
  }
  // Fallback
  else {
    detectedIp = 'fallback-identifier';
    recommendation = '⚠️ No proxy headers found - using fallback identifier (user-agent based)';
  }

  return {
    detectedIp,
    headers,
    recommendation,
  };
}

// Add this to your API route temporarily to debug:
// import { debugIPHeaders } from '@/lib/ip-debug';
// const debug = debugIPHeaders(request);
// console.log('IP Debug:', debug);
