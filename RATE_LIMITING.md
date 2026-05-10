# Rate Limiting Guide

## Overview

Rate limiting is implemented to prevent spam and abuse of the contact API. It restricts the number of requests a user can make within a specific time window.

## Current Configuration

**Default Rate Limit:** `standard`
- **5 requests per 10 minutes** per IP address
- Applies to both contact form and chatbot submissions

## How It Works

### 1. IP Detection (Works with AND without Cloudflare)

The system automatically detects the real client IP using a priority chain:

**Priority 1: Cloudflare** (When using Cloudflare proxy)
- `CF-Connecting-IP` header - Most reliable for Cloudflare
- `True-Client-IP` header - Cloudflare Enterprise

**Priority 2: Standard Proxies** (Nginx, load balancers)
- `X-Forwarded-For` header - Takes first IP from comma-separated list
- `X-Real-IP` header - Direct client IP

**Priority 3: Direct Connection** (No proxy)
- Detects localhost for development
- Uses fallback identifier based on User-Agent

**✅ This means:**
- Works automatically with Cloudflare proxy ✓
- Works with other proxies (Nginx, etc.) ✓
- Works with direct connections ✓
- Works in development (localhost) ✓

### Example IP Detection:

**With Cloudflare:**
```
CF-Connecting-IP: 203.0.113.195
X-Forwarded-For: 203.0.113.195, 104.16.0.1
→ Uses: 203.0.113.195 (from CF-Connecting-IP)
```

**Without Cloudflare (Direct):**
```
X-Forwarded-For: 203.0.113.195
→ Uses: 203.0.113.195 (from X-Forwarded-For)
```

**Development:**
```
Host: localhost:3000
→ Uses: localhost
```

### 2. Tracking
- In-memory storage tracks requests per IP
- Counter resets after the time window expires
- Old entries are automatically cleaned up every 10 minutes

### 3. Response
When rate limit is exceeded:
- **HTTP Status:** `429 Too Many Requests`
- **Headers Included:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Timestamp when limit resets
  - `Retry-After`: Seconds until retry is allowed

## Available Presets

Located in `/lib/ratelimit.ts`:

```typescript
// Very strict - 3 requests per 15 minutes
RateLimitPresets.strict

// Standard - 5 requests per 10 minutes (DEFAULT)
RateLimitPresets.standard

// Relaxed - 10 requests per 5 minutes
RateLimitPresets.relaxed

// Development - 5 requests per minute
RateLimitPresets.development
```

## Changing Rate Limit

### Option 1: Use a Different Preset

Edit `/app/api/contact/route.ts`:

```typescript
// Change from 'standard' to 'relaxed'
const rateLimitResult = rateLimit(identifier, RateLimitPresets.relaxed);
```

### Option 2: Custom Configuration

```typescript
const rateLimitResult = rateLimit(identifier, {
  interval: 5 * 60 * 1000,  // 5 minutes
  maxRequests: 3,           // 3 requests
});
```

## Debugging IP Detection

To verify which IP is being detected:

### Option 1: Add Temporary Logging

Add to `/app/api/contact/route.ts` (temporarily):

```typescript
import { debugIPHeaders } from '@/lib/ip-debug';

export async function POST(request: Request) {
  // Add this temporarily for debugging
  const debug = debugIPHeaders(request);
  console.log('🔍 IP Detection Debug:', debug);
  
  // ... rest of your code
}
```

Then check your terminal for output like:
```
🔍 IP Detection Debug: {
  detectedIp: '203.0.113.195',
  headers: {
    'cf-connecting-ip': '203.0.113.195',
    'x-forwarded-for': '203.0.113.195, 104.16.0.1',
    ...
  },
  recommendation: '✅ Cloudflare detected - using CF-Connecting-IP'
}
```

### Option 2: Check Rate Limit Headers (Alternative)

Submit the form and check the response headers in browser DevTools (Network tab):

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1234567890000
```

### Cloudflare Setup Verification

**If using Cloudflare:**
1. Enable "IP Geolocation" in Cloudflare dashboard (Network tab)
2. Ensure "Transform Rules" aren't modifying headers
3. Check that `CF-Connecting-IP` is being sent

**If NOT using Cloudflare:**
1. System will use `X-Forwarded-For` or `X-Real-IP`
2. For direct connections, fallback identifier is used
3. This still provides rate limiting protection

## Testing Rate Limiting

### 1. Test in Browser
1. Open contact form or chatbot
2. Submit 5 times quickly
3. 6th submission will be blocked with error message

### 2. Test with curl

```bash
# Send 6 requests quickly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test",
      "email": "test@example.com",
      "message": "Test message '$i'"
    }'
  echo "\n---"
done
```

Expected: First 5 succeed, 6th returns 429 error.

### 3. Check Rate Limit Headers

```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hi"}'
```

Look for headers:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1234567890000
```

## User Experience

### Contact Form
When rate limited, user sees:
```
❌ Failed to send message
Too many requests. Please try again in 10 minutes.
```

### Chatbot
When rate limited, user sees:
```
⏱️ You've sent too many messages recently. 
Please try again in 10 minutes. 
If urgent, please call us directly.
```

## Production Considerations

### Current Solution (In-Memory)
✅ **Pros:**
- Simple, no external dependencies
- Works immediately
- No cost

❌ **Cons:**
- Resets when server restarts
- Doesn't work across multiple servers
- Uses server memory

### Recommended for Production: Redis-based

For production with multiple servers or serverless (Vercel), upgrade to Redis:

#### Install Upstash Redis (Free tier available)

```bash
npm install @upstash/redis @upstash/ratelimit
```

#### Update `/lib/ratelimit.ts`

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});
```

#### Add to `.env.local`

```bash
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

## Bypassing Rate Limits (Allowlist)

To allow certain IPs to bypass rate limiting:

```typescript
// In /lib/ratelimit.ts
const ALLOWLIST = ['127.0.0.1', 'your-office-ip'];

export function rateLimit(identifier: string, config: RateLimitConfig) {
  // Skip rate limiting for allowlisted IPs
  if (ALLOWLIST.includes(identifier)) {
    return { success: true, remaining: 999, reset: Date.now() };
  }
  
  // ... rest of the code
}
```

## Monitoring

### Check Rate Limit Store

```typescript
// Add to /lib/ratelimit.ts for debugging
export function getRateLimitStats() {
  return {
    totalKeys: Object.keys(store).length,
    entries: store,
  };
}
```

### Log Rate Limit Events

```typescript
// In /app/api/contact/route.ts
if (!rateLimitResult.success) {
  console.warn(`⚠️ Rate limit exceeded for IP: ${identifier}`);
  // ... return 429
}
```

## Common Scenarios

### Scenario 1: Legitimate User Behind Corporate Proxy
**Problem:** Multiple users share same IP, hit limit quickly  
**Solution:** 
- Use more relaxed preset
- Implement user-based rate limiting (requires auth)
- Allowlist corporate IPs

### Scenario 2: Testing/Development
**Problem:** Constant rate limit hits during testing  
**Solution:**
```typescript
// Use development preset
const isDev = process.env.NODE_ENV === 'development';
const preset = isDev ? RateLimitPresets.development : RateLimitPresets.standard;
```

### Scenario 3: DDoS Attack
**Problem:** Attacker using multiple IPs  
**Solution:**
- Add CAPTCHA (reCAPTCHA, Cloudflare Turnstile)
- Use Cloudflare WAF
- Implement progressive delays

## Security Best Practices

1. ✅ **Always use HTTPS** in production
2. ✅ **Log rate limit violations** for monitoring
3. ✅ **Combine with CAPTCHA** for critical forms
4. ✅ **Use Redis** for production (multiple servers)
5. ✅ **Monitor for patterns** of abuse
6. ✅ **Consider user authentication** for higher limits

## Troubleshooting

### Issue: Rate limit not working
**Check:**
- Is `getClientIdentifier()` returning valid IPs?
- Are you behind a proxy? Check headers.
- Look at console logs for IP values

### Issue: Rate limit too strict
**Solutions:**
- Increase `maxRequests`
- Increase `interval` time window
- Use `relaxed` preset

### Issue: Rate limit resets on deployment
**Normal behavior** for in-memory store  
**Solution:** Upgrade to Redis for persistence

## Files Modified

- `/lib/ratelimit.ts` - Rate limiting logic
- `/app/api/contact/route.ts` - Applied rate limiting
- `/app/contact/page.tsx` - Handle 429 errors
- `/components/Chatbot.tsx` - Handle 429 errors

## Cloudflare Configuration

If you're using Cloudflare proxy:

### Required Settings

1. **Restore Visitor IP** (Auto-enabled)
   - Cloudflare automatically adds `CF-Connecting-IP` header
   - No configuration needed

2. **Optional: IP Geolocation**
   - Go to: Network → Enable IP Geolocation
   - Adds country/city information (not used for rate limiting)

### Verify Cloudflare Headers

You can check if Cloudflare is sending the headers by adding temporary logging to your API route (see "Debugging IP Detection" section above).

Look for these headers:
```
CF-Ray: xxxxx
CF-Connecting-IP: 203.0.113.195
X-Forwarded-For: 203.0.113.195, 104.16.0.1
```

### Cloudflare + Rate Limiting

**Advantages:**
- ✅ Real visitor IP detected (bypasses proxy)
- ✅ Accurate rate limiting per user
- ✅ Works with Cloudflare's DDoS protection

**Alternative: Use Cloudflare Rate Limiting**
- Cloudflare offers built-in rate limiting in dashboard
- Can work together with app-level rate limiting
- Enterprise: More advanced rules available

## Direct Connection (No Proxy)

If you're NOT using Cloudflare or any proxy:

**What happens:**
1. System checks for `X-Forwarded-For` header (from your server/load balancer)
2. Falls back to `X-Real-IP` if available
3. Uses fallback identifier if no headers found

**Works fine because:**
- Rate limiting still applies per user
- Uses User-Agent + Accept-Language as identifier
- Prevents spam effectively

## Summary

✅ **Currently Protected:**
- Contact form submissions
- Chatbot conversations
- Both use same rate limit pool per IP

✅ **Default Limit:**
- 5 submissions per 10 minutes per IP address

✅ **User-Friendly:**
- Clear error messages
- Shows time until retry allowed
- Doesn't block permanently
