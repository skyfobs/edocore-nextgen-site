# Nginx Quick Reference

## Common Commands

### Start/Stop Services

```bash
# Start all services
docker-compose -f docker-compose.nginx.yml up -d

# Stop all services
docker-compose -f docker-compose.nginx.yml down

# Restart specific service
docker-compose -f docker-compose.nginx.yml restart nginx
docker-compose -f docker-compose.nginx.yml restart educore-web

# View status
docker-compose -f docker-compose.nginx.yml ps
```

### Logs

```bash
# Follow all logs
docker-compose -f docker-compose.nginx.yml logs -f

# Nginx logs only
docker-compose -f docker-compose.nginx.yml logs -f nginx

# Next.js logs only
docker-compose -f docker-compose.nginx.yml logs -f educore-web

# Last 100 lines
docker-compose -f docker-compose.nginx.yml logs --tail=100 nginx
```

### Nginx Configuration

```bash
# Test configuration
docker-compose -f docker-compose.nginx.yml exec nginx nginx -t

# Reload configuration (no downtime)
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload

# Restart Nginx
docker-compose -f docker-compose.nginx.yml restart nginx

# View running config
docker-compose -f docker-compose.nginx.yml exec nginx cat /etc/nginx/nginx.conf
```

### SSL Certificates

```bash
# View certificates
docker-compose -f docker-compose.nginx.yml run --rm certbot certificates

# Renew certificates
docker-compose -f docker-compose.nginx.yml run --rm certbot renew

# Test renewal (dry run)
docker-compose -f docker-compose.nginx.yml run --rm certbot renew --dry-run

# Check expiry
echo | openssl s_client -servername educorenextgen.com -connect educorenextgen.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Debugging

```bash
# Shell into Nginx container
docker-compose -f docker-compose.nginx.yml exec nginx sh

# Shell into Next.js container
docker-compose -f docker-compose.nginx.yml exec educore-web sh

# Test endpoints
curl -I https://educorenextgen.com
curl -I https://educorenextgen.com/api/health

# Check DNS
dig educorenextgen.com
nslookup educorenextgen.com

# Check ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# View resource usage
docker stats
```

### Database

```bash
# Access database
docker-compose -f docker-compose.nginx.yml exec educore-web sh
cd /app/data
sqlite3 educore.db

# View submissions
docker-compose -f docker-compose.nginx.yml exec educore-web sqlite3 /app/data/educore.db "SELECT * FROM contact_submissions;"
```

### Backup

```bash
# Backup certificates
tar -czf certbot-backup-$(date +%Y%m%d).tar.gz certbot/

# Backup database
cp data/educore.db data/educore-backup-$(date +%Y%m%d).db

# Backup everything
tar -czf full-backup-$(date +%Y%m%d).tar.gz data/ certbot/ nginx/logs/
```

### Troubleshooting

```bash
# 502 Bad Gateway
docker-compose -f docker-compose.nginx.yml logs educore-web
docker-compose -f docker-compose.nginx.yml restart educore-web

# SSL errors
docker-compose -f docker-compose.nginx.yml logs nginx
ls -la certbot/conf/live/educorenextgen.com/

# Certificate issues
./init-letsencrypt.sh

# Reset everything
docker-compose -f docker-compose.nginx.yml down
docker system prune -a
./init-letsencrypt.sh
```

## File Locations

```
Project Root
├── nginx/
│   ├── nginx.conf                      # Main config
│   ├── conf.d/
│   │   └── educorenextgen.conf        # Site config
│   └── logs/                           # Nginx logs
├── certbot/
│   ├── conf/                           # SSL certificates
│   └── www/                            # ACME challenge
├── data/                               # Database
├── docker-compose.nginx.yml            # Docker compose
└── init-letsencrypt.sh                # SSL setup script
```

## URLs

- **Production:** https://educorenextgen.com
- **WWW:** https://www.educorenextgen.com
- **Health Check:** https://educorenextgen.com/api/health

## Quick Setup

```bash
# 1. Initial setup
git clone <repo>
cd educore-website

# 2. Environment
cp .env.example .env
nano .env  # Add credentials

# 3. SSL setup
nano init-letsencrypt.sh  # Update email
./init-letsencrypt.sh

# 4. Verify
curl -I https://educorenextgen.com
```

## Emergency Commands

```bash
# Stop everything
docker-compose -f docker-compose.nginx.yml down

# Remove all containers
docker-compose -f docker-compose.nginx.yml down -v

# Clean Docker
docker system prune -a

# Start fresh
./init-letsencrypt.sh
```

## Monitoring

```bash
# Real-time logs
docker-compose -f docker-compose.nginx.yml logs -f

# Resource usage
docker stats

# Service health
docker-compose -f docker-compose.nginx.yml ps

# Disk usage
df -h
du -sh data/
du -sh nginx/logs/
```

## Performance

```bash
# Test HTTPS
curl -w "@-" -o /dev/null -s https://educorenextgen.com << 'EOF'
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_starttransfer:  %{time_starttransfer}\n
time_total:  %{time_total}\n
EOF

# Check Gzip
curl -H "Accept-Encoding: gzip" -I https://educorenextgen.com

# Check caching
curl -I https://educorenextgen.com/_next/static/...
```

## Security

```bash
# Check SSL rating
https://www.ssllabs.com/ssltest/analyze.html?d=educorenextgen.com

# Check headers
curl -I https://educorenextgen.com | grep -i "strict-transport-security\|x-frame-options\|x-content-type"

# Test rate limiting
for i in {1..15}; do curl -I https://educorenextgen.com/api/contact; done
```
