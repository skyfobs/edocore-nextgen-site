# Troubleshooting Guide

## Common Issues and Solutions

---

## SQLITE_READONLY Error in Production

### Error Message
```
❌ Contact API Error: [Error: SQLITE_READONLY: attempt to write a readonly database] {
  errno: 8,
  code: 'SQLITE_READONLY'
}
```

### Cause
The Docker container runs as user `nextjs` (uid 1001), but the mounted `data` directory doesn't have write permissions for this user.

### Solution

**Option 1: Use the Fix Script (Recommended)**

```bash
# On your server
chmod +x fix-permissions.sh
./fix-permissions.sh
```

**Option 2: Manual Fix**

```bash
# Create data directory
mkdir -p data logs

# Fix ownership (1001:1001 matches container user)
sudo chown -R 1001:1001 data/
sudo chown -R 1001:1001 logs/

# Fix permissions
sudo chmod 755 data/
sudo chmod 644 data/educore.db  # if exists
```

**Option 3: Quick Fix for Testing**

```bash
# Give everyone write access (not recommended for production)
chmod 777 data/
```

### After Fixing Permissions

```bash
# Restart containers
docker-compose -f docker-compose.nginx.yml restart

# Or rebuild and restart
docker-compose -f docker-compose.nginx.yml down
docker-compose -f docker-compose.nginx.yml up -d --build

# Check logs
docker-compose -f docker-compose.nginx.yml logs -f educore-web
```

### Verify Fix

```bash
# Test the contact form or chatbot
# Check logs - should see success messages:
✅ Contact submission saved to database
✅ Telegram notification sent successfully
```

---

## Container User Info

The Docker container runs as:
- **User:** nextjs
- **UID:** 1001
- **GID:** 1001

The mounted directories must be owned by uid 1001:

```bash
ls -la data/
# Should show: drwxr-xr-x 1001 1001 data/

ls -la data/educore.db
# Should show: -rw-r--r-- 1001 1001 educore.db
```

---

## Build Fails - SQLite3 Bindings Error

### Error Message
```
Error: Failed to load external module sqlite3
Error: Could not locate the bindings file
```

### Solution

This is already fixed in the Dockerfile. If you still see this:

```bash
# Clean rebuild
docker-compose -f docker-compose.nginx.yml down
docker system prune -a -f
docker-compose -f docker-compose.nginx.yml up -d --build
```

The Dockerfile now includes:
```dockerfile
RUN npm rebuild sqlite3 --build-from-source
```

---

## 502 Bad Gateway

### Error
Nginx shows "502 Bad Gateway"

### Cause
Next.js container not running

### Solution

```bash
# Check container status
docker-compose -f docker-compose.nginx.yml ps

# Check Next.js logs
docker-compose -f docker-compose.nginx.yml logs educore-web

# Restart Next.js
docker-compose -f docker-compose.nginx.yml restart educore-web

# If still failing, rebuild
docker-compose -f docker-compose.nginx.yml up -d --build educore-web
```

---

## SSL Certificate Errors

### Error
```
SSL certificate problem
```

### Solutions

**Certificate doesn't exist:**
```bash
# Run SSL setup
./init-letsencrypt.sh
```

**Certificate expired:**
```bash
# Renew certificate
docker-compose -f docker-compose.nginx.yml run --rm certbot renew

# Reload Nginx
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload
```

**Certificate location wrong:**
```bash
# Check certificate exists
ls -la certbot/conf/live/educorenextgen.com/

# Should contain:
# fullchain.pem
# privkey.pem
```

---

## Database File Not Found

### Error
```
SQLITE_CANTOPEN: unable to open database file
```

### Solution

```bash
# Create data directory
mkdir -p data

# Fix permissions
sudo chown -R 1001:1001 data/
sudo chmod 755 data/

# The database will be created automatically on first use
# Restart container
docker-compose -f docker-compose.nginx.yml restart educore-web
```

---

## Rate Limit Issues

### Error
```
⏱️ You've sent too many messages recently
```

### This is Normal
Rate limiting is working (5 requests per 10 minutes per IP)

### To Adjust Rate Limit

Edit `lib/ratelimit.ts`:
```typescript
export const RateLimitPresets = {
  contact: {
    interval: 10 * 60 * 1000, // Change this
    maxRequests: 5,           // Or this
  },
};
```

Rebuild and restart:
```bash
docker-compose -f docker-compose.nginx.yml up -d --build
```

---

## Telegram Notifications Not Working

### Check Environment Variables

```bash
# Verify .env file
cat .env

# Should contain:
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Test Telegram

```bash
# Check logs
docker-compose -f docker-compose.nginx.yml logs -f educore-web

# Should see:
✅ Telegram notification sent successfully

# Or error:
⚠️ Telegram notification failed (non-critical): Error message
```

### Verify Bot Configuration

1. Bot is added to the group
2. Bot has permission to send messages
3. Chat ID includes the `-` sign (e.g., `-5087350776`)
4. Token is correct

---

## Port Already in Use

### Error
```
bind: address already in use
```

### Solution

**Check what's using the port:**
```bash
# Check port 80
sudo lsof -i :80

# Check port 443
sudo lsof -i :443

# Check port 3000
sudo lsof -i :3000
```

**Kill process or change port:**
```bash
# Kill process
sudo kill -9 <PID>

# Or change port in docker-compose
ports:
  - "8080:80"  # Change 80 to 8080
```

---

## Nginx Configuration Errors

### Test Configuration

```bash
# Test config syntax
docker-compose -f docker-compose.nginx.yml exec nginx nginx -t

# Should see:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Common Errors

**Syntax error:**
- Check semicolons
- Check brackets
- Check quotes

**Fix:**
```bash
# Edit config
nano nginx/conf.d/educorenextgen.conf

# Test
docker-compose -f docker-compose.nginx.yml exec nginx nginx -t

# Reload
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload
```

---

## DNS Not Resolving

### Check DNS

```bash
# Check A record
dig educorenextgen.com

# Should show your server IP
```

### Wait for Propagation

DNS changes take 5-30 minutes to propagate.

### Hosts File (Testing Only)

```bash
# Edit hosts file
sudo nano /etc/hosts

# Add line:
YOUR_SERVER_IP educorenextgen.com www.educorenextgen.com
```

---

## Docker Compose Not Found

### Error
```
docker-compose: command not found
```

### Solution

**Option 1: Use `docker compose` (newer)**
```bash
docker compose -f docker-compose.nginx.yml up -d
```

**Option 2: Install docker-compose**
```bash
sudo apt-get install docker-compose
```

---

## Out of Disk Space

### Check Disk Space

```bash
df -h
du -sh data/
du -sh nginx/logs/
```

### Clean Up

```bash
# Remove unused Docker images
docker system prune -a

# Remove old logs
sudo rm -rf nginx/logs/*.log.1

# Compress database backups
gzip data/educore-backup-*.db
```

---

## Container Keeps Restarting

### Check Logs

```bash
# View why it's failing
docker-compose -f docker-compose.nginx.yml logs educore-web
```

### Common Causes

1. **Environment variables missing** - Check `.env`
2. **Build error** - Check build logs
3. **Port conflict** - Change port
4. **Memory limit** - Increase in docker-compose

---

## Health Check Failing

### Check Health

```bash
# Check all services
docker-compose -f docker-compose.nginx.yml ps

# Should show "healthy" status
```

### Test Manually

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Should return:
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 123.45
}
```

---

## File Permissions After Deployment

### Fix All Permissions

```bash
# Run the fix script
./fix-permissions.sh

# Or manually:
sudo chown -R 1001:1001 data/ logs/
sudo chmod 755 data/
sudo chmod 644 data/educore.db
```

---

## Quick Diagnostic Commands

```bash
# 1. Check all services
docker-compose -f docker-compose.nginx.yml ps

# 2. Check logs
docker-compose -f docker-compose.nginx.yml logs --tail=50

# 3. Check disk space
df -h

# 4. Check permissions
ls -la data/

# 5. Test Next.js directly
curl http://localhost:3000/api/health

# 6. Test through Nginx
curl https://educorenextgen.com/api/health

# 7. Check certificate
docker-compose -f docker-compose.nginx.yml run --rm certbot certificates

# 8. Test database
docker-compose -f docker-compose.nginx.yml exec educore-web sqlite3 /app/data/educore.db "SELECT COUNT(*) FROM contact_submissions;"
```

---

## Getting Help

### Collect Diagnostic Info

```bash
# Save this info for support
echo "=== Docker Compose Status ===" >> debug.txt
docker-compose -f docker-compose.nginx.yml ps >> debug.txt

echo "=== Container Logs ===" >> debug.txt
docker-compose -f docker-compose.nginx.yml logs --tail=100 >> debug.txt

echo "=== Disk Space ===" >> debug.txt
df -h >> debug.txt

echo "=== Permissions ===" >> debug.txt
ls -la data/ >> debug.txt

echo "=== Environment ===" >> debug.txt
env | grep -E 'NODE_ENV|TELEGRAM' >> debug.txt

# Send debug.txt when asking for help
```

---

## Still Having Issues?

1. Check this troubleshooting guide first
2. Review logs: `docker-compose -f docker-compose.nginx.yml logs -f`
3. Check Docker status: `docker-compose -f docker-compose.nginx.yml ps`
4. Restart services: `docker-compose -f docker-compose.nginx.yml restart`
5. Rebuild if needed: `docker-compose -f docker-compose.nginx.yml up -d --build`
