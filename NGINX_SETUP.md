# Nginx Reverse Proxy Setup Guide

## Overview

This guide covers setting up Nginx as a reverse proxy for your Next.js application with:
- **SSL/TLS certificates** (Let's Encrypt)
- **HTTP to HTTPS redirect**
- **Security headers**
- **Caching optimization**
- **Rate limiting**
- **Auto certificate renewal**

**Domain:** educorenextgen.com

---

## Architecture

```
Internet
    ↓
Nginx (Port 80/443)
    ↓ HTTP/HTTPS
    ↓ Reverse Proxy
    ↓
Next.js App (Port 3000)
    ↓
SQLite Database
```

---

## Prerequisites

### 1. Server Requirements

- **VPS/Server** with public IP
- **Docker & Docker Compose** installed
- **Domain configured**: Point `educorenextgen.com` and `www.educorenextgen.com` to your server IP

### 2. DNS Setup

Add these A records to your domain DNS:

```
Type   Name   Value (IP Address)
A      @      YOUR_SERVER_IP
A      www    YOUR_SERVER_IP
```

**Verify DNS:**
```bash
dig educorenextgen.com
dig www.educorenextgen.com
```

Wait for DNS propagation (5-30 minutes).

---

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/skyfobs/edocore-nextgen-site.git
cd edocore-nextgen-site
```

### 2. Set Environment Variables

```bash
# Create .env file
cat > .env << EOF
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
EOF
```

### 3. Update Email in SSL Script

Edit `init-letsencrypt.sh`:
```bash
EMAIL="your-email@example.com"  # Change this
```

### 4. Run SSL Setup

```bash
chmod +x init-letsencrypt.sh
./init-letsencrypt.sh
```

This will:
- Create SSL certificates
- Configure Nginx
- Start all services

### 5. Verify

```bash
# Check services
docker-compose -f docker-compose.nginx.yml ps

# Test HTTPS
curl -I https://educorenextgen.com

# View logs
docker-compose -f docker-compose.nginx.yml logs -f
```

---

## Manual Setup

### 1. Build Application

```bash
docker-compose -f docker-compose.nginx.yml build
```

### 2. Start Services (Without SSL)

For initial testing without SSL:

```bash
# Start only Next.js app
docker-compose up -d educore-web

# Test on port 3000
curl http://localhost:3000
```

### 3. Obtain SSL Certificate

Run the init script:
```bash
./init-letsencrypt.sh
```

**OR manually:**

```bash
# Create directories
mkdir -p certbot/conf certbot/www

# Start Nginx
docker-compose -f docker-compose.nginx.yml up -d nginx

# Get certificate
docker-compose -f docker-compose.nginx.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d educorenextgen.com \
  -d www.educorenextgen.com

# Restart with SSL
docker-compose -f docker-compose.nginx.yml restart nginx
```

### 4. Start All Services

```bash
docker-compose -f docker-compose.nginx.yml up -d
```

---

## Configuration Files

### Nginx Main Config: `nginx/nginx.conf`

```nginx
# Global settings
- Worker processes
- Gzip compression
- Security headers
- Logging
```

### Site Config: `nginx/conf.d/educorenextgen.conf`

```nginx
# HTTP (Port 80) - Redirects to HTTPS
# HTTPS (Port 443) - Main application
```

**Features:**
- ✅ SSL/TLS termination
- ✅ HTTP/2 support
- ✅ Security headers
- ✅ Static file caching
- ✅ API route optimization
- ✅ Rate limiting
- ✅ Gzip compression

---

## Docker Compose Services

### `docker-compose.nginx.yml`

**Services:**

1. **educore-web** - Next.js application
   - Port: 3000 (internal)
   - Network: educore-network

2. **nginx** - Reverse proxy
   - Ports: 80, 443 (external)
   - Depends on: educore-web

3. **certbot** - SSL certificate manager
   - Auto-renews certificates every 12 hours

---

## SSL/TLS Certificate Management

### Certificate Location

```
certbot/conf/
├── live/
│   └── educorenextgen.com/
│       ├── fullchain.pem    ← Certificate
│       ├── privkey.pem      ← Private key
│       └── chain.pem
├── archive/
└── renewal/
```

### Manual Renewal

```bash
# Renew certificate
docker-compose -f docker-compose.nginx.yml run --rm certbot renew

# Test renewal (dry run)
docker-compose -f docker-compose.nginx.yml run --rm certbot renew --dry-run

# Reload Nginx after renewal
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload
```

### Auto-Renewal

Certificate auto-renews via the certbot container:
- Checks every 12 hours
- Renews if expiring in <30 days
- Let's Encrypt certificates valid for 90 days

### Check Certificate Status

```bash
# View certificate info
docker-compose -f docker-compose.nginx.yml run --rm certbot certificates

# Check expiry date
echo | openssl s_client -servername educorenextgen.com -connect educorenextgen.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Cloudflare Integration (Optional)

If using Cloudflare CDN:

### 1. Update Nginx Config

Uncomment in `nginx/conf.d/educorenextgen.conf`:

```nginx
# Get real client IP from Cloudflare
real_ip_header CF-Connecting-IP;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
# ... add all Cloudflare IP ranges
```

### 2. Cloudflare Settings

**SSL/TLS Mode:** Full (strict)
- Not "Flexible" (will cause redirect loop)

**Always Use HTTPS:** ON

**Automatic HTTPS Rewrites:** ON

**Get Cloudflare IP Ranges:**
```bash
curl https://www.cloudflare.com/ips-v4
```

---

## Performance Optimization

### 1. Caching Strategy

**Static Assets** (`/_next/static/`):
```nginx
Cache-Control: public, max-age=31536000, immutable
# Cache for 1 year
```

**Public Files** (`/public/`):
```nginx
Cache-Control: public, max-age=604800
# Cache for 1 week
```

**API Routes** (`/api/`):
```nginx
Cache-Control: no-store, no-cache, must-revalidate
# No caching
```

### 2. Gzip Compression

Enabled for:
- HTML, CSS, JavaScript
- JSON, XML
- Fonts
- Images (SVG)

### 3. HTTP/2

Enabled by default:
```nginx
listen 443 ssl http2;
```

### 4. Keep-Alive

```nginx
upstream nextjs_backend {
    keepalive 32;
}
```

---

## Security Features

### 1. Security Headers

```nginx
Strict-Transport-Security: max-age=31536000
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 2. Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
```
- 10 requests per second per IP
- Burst of 20 allowed

### 3. SSL Configuration

- **Protocols:** TLS 1.2, TLS 1.3
- **Ciphers:** Strong encryption only
- **HSTS:** Enabled (forces HTTPS for 1 year)

### 4. Hidden Files Protection

```nginx
location ~ /\. {
    deny all;
}
```

Blocks access to `.env`, `.git`, etc.

---

## Monitoring & Logs

### View Logs

```bash
# All services
docker-compose -f docker-compose.nginx.yml logs -f

# Specific service
docker-compose -f docker-compose.nginx.yml logs -f nginx
docker-compose -f docker-compose.nginx.yml logs -f educore-web

# Nginx access logs
tail -f nginx/logs/educorenextgen.access.log

# Nginx error logs
tail -f nginx/logs/educorenextgen.error.log
```

### Log Rotation

Automatic log rotation (Docker logging):
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

Keeps last 3 files × 10MB each.

### Health Checks

```bash
# Check all services health
docker-compose -f docker-compose.nginx.yml ps

# Test Nginx
curl -I https://educorenextgen.com

# Test Next.js directly
curl http://localhost:3000/api/health

# Test through Nginx
curl https://educorenextgen.com/api/health
```

---

## Troubleshooting

### Issue: Certificate Generation Fails

**Error:** "Failed to obtain certificate"

**Solutions:**

1. **Check DNS:**
   ```bash
   dig educorenextgen.com
   # Must point to your server IP
   ```

2. **Check port 80 is open:**
   ```bash
   sudo netstat -tulpn | grep :80
   ```

3. **Check firewall:**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. **Use staging first:**
   Edit `init-letsencrypt.sh`:
   ```bash
   STAGING=1  # Test mode
   ```

5. **Check rate limits:**
   Let's Encrypt has rate limits (5 failures per hour).
   Wait or use staging.

### Issue: HTTPS Not Working

**Error:** "Connection refused" or "SSL handshake failed"

**Solutions:**

1. **Check certificate exists:**
   ```bash
   ls -la certbot/conf/live/educorenextgen.com/
   ```

2. **Check Nginx config:**
   ```bash
   docker-compose -f docker-compose.nginx.yml exec nginx nginx -t
   ```

3. **Check Nginx logs:**
   ```bash
   docker-compose -f docker-compose.nginx.yml logs nginx
   ```

4. **Restart services:**
   ```bash
   docker-compose -f docker-compose.nginx.yml restart
   ```

### Issue: 502 Bad Gateway

**Error:** Nginx shows "502 Bad Gateway"

**Cause:** Next.js app not running

**Solutions:**

1. **Check Next.js container:**
   ```bash
   docker-compose -f docker-compose.nginx.yml ps educore-web
   ```

2. **Check logs:**
   ```bash
   docker-compose -f docker-compose.nginx.yml logs educore-web
   ```

3. **Test directly:**
   ```bash
   curl http://localhost:3000
   ```

4. **Restart Next.js:**
   ```bash
   docker-compose -f docker-compose.nginx.yml restart educore-web
   ```

### Issue: Redirect Loop

**Error:** "Too many redirects"

**Cause:** Usually Cloudflare SSL mode set to "Flexible"

**Solution:**
- Cloudflare: Set SSL/TLS mode to "Full (strict)"

### Issue: Real IP Not Captured

**Error:** Logs show Nginx IP instead of client IP

**Solution:** Add to Nginx config:
```nginx
set_real_ip_from 172.20.0.0/16;  # Docker network
real_ip_header X-Forwarded-For;
```

---

## Backup & Restore

### Backup SSL Certificates

```bash
# Backup certificates
tar -czf certbot-backup-$(date +%Y%m%d).tar.gz certbot/

# Copy to safe location
scp certbot-backup-*.tar.gz user@backup-server:/backups/
```

### Restore Certificates

```bash
# Extract backup
tar -xzf certbot-backup-YYYYMMDD.tar.gz

# Restart services
docker-compose -f docker-compose.nginx.yml restart
```

---

## Deployment Commands

### Initial Deployment

```bash
# 1. Clone repository
git clone <repo-url>
cd educore-website

# 2. Set environment variables
cp .env.example .env
nano .env

# 3. Update email in SSL script
nano init-letsencrypt.sh

# 4. Run setup
./init-letsencrypt.sh

# 5. Verify
curl -I https://educorenextgen.com
```

### Update Application

```bash
# 1. Pull latest code
git pull origin main

# 2. Rebuild and restart
docker-compose -f docker-compose.nginx.yml up -d --build

# 3. Verify
docker-compose -f docker-compose.nginx.yml ps
```

### Complete Restart

```bash
# Stop all services
docker-compose -f docker-compose.nginx.yml down

# Start all services
docker-compose -f docker-compose.nginx.yml up -d

# View logs
docker-compose -f docker-compose.nginx.yml logs -f
```

---

## Production Checklist

### Before Going Live

- [ ] DNS records configured (A and AAAA)
- [ ] Firewall allows ports 80, 443
- [ ] Email in `init-letsencrypt.sh` updated
- [ ] Environment variables set (`.env`)
- [ ] SSL certificate obtained
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS
- [ ] Database mounted correctly
- [ ] Telegram notifications working
- [ ] Rate limiting tested
- [ ] Logs rotating properly
- [ ] Backups configured
- [ ] Monitoring set up

### Security Hardening

- [ ] Change default SSH port
- [ ] Disable root SSH login
- [ ] Set up fail2ban
- [ ] Configure UFW firewall
- [ ] Enable automatic security updates
- [ ] Set up database backups
- [ ] Review Nginx security headers
- [ ] Test rate limiting
- [ ] Set up monitoring/alerts

---

## Useful Commands

```bash
# Start services
docker-compose -f docker-compose.nginx.yml up -d

# Stop services
docker-compose -f docker-compose.nginx.yml down

# Restart specific service
docker-compose -f docker-compose.nginx.yml restart nginx

# View logs
docker-compose -f docker-compose.nginx.yml logs -f nginx

# Shell into container
docker-compose -f docker-compose.nginx.yml exec nginx sh

# Test Nginx config
docker-compose -f docker-compose.nginx.yml exec nginx nginx -t

# Reload Nginx (without restart)
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload

# View certificate info
docker-compose -f docker-compose.nginx.yml run --rm certbot certificates

# Renew certificates
docker-compose -f docker-compose.nginx.yml run --rm certbot renew

# Check service status
docker-compose -f docker-compose.nginx.yml ps

# View resource usage
docker stats
```

---

## Summary

✅ **Nginx configured** as reverse proxy  
✅ **SSL/TLS enabled** with Let's Encrypt  
✅ **HTTP to HTTPS** redirect  
✅ **Security headers** enabled  
✅ **Caching optimized** for performance  
✅ **Rate limiting** for DDoS protection  
✅ **Auto-renewal** for certificates  
✅ **Health checks** enabled  
✅ **Logging** configured  

**Your site is production-ready at:**
- https://educorenextgen.com
- https://www.educorenextgen.com

---

**Need help?** Check the troubleshooting section or review logs.
