# Nginx Configuration

This directory contains Nginx configuration files for the EduCore NextGen website.

## Structure

```
nginx/
├── nginx.conf                           # Main Nginx configuration
├── conf.d/
│   ├── educorenextgen.conf             # Production config (HTTPS)
│   └── educorenextgen-dev.conf.example # Development config (HTTP only)
└── logs/                                # Nginx logs (created automatically)
    ├── access.log
    └── error.log
```

## Configuration Files

### `nginx.conf`
Main Nginx configuration with:
- Worker processes
- Gzip compression
- Security headers
- Global settings

### `conf.d/educorenextgen.conf`
Production site configuration with:
- SSL/TLS setup
- HTTP to HTTPS redirect
- Reverse proxy to Next.js
- Caching rules
- Security headers
- Rate limiting

### `conf.d/educorenextgen-dev.conf.example`
Development configuration (HTTP only) for local testing.

## Usage

### Production (with SSL)
1. Run SSL setup: `./init-letsencrypt.sh`
2. Start services: `docker-compose -f docker-compose.nginx.yml up -d`

### Development (no SSL)
1. Copy dev config: `cp conf.d/educorenextgen-dev.conf.example conf.d/educorenextgen.conf`
2. Comment out SSL section in docker-compose
3. Start: `docker-compose -f docker-compose.nginx.yml up -d`

## Testing Configuration

```bash
# Test Nginx config syntax
docker-compose -f docker-compose.nginx.yml exec nginx nginx -t

# Reload Nginx
docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload
```

## Logs

Access logs: `nginx/logs/educorenextgen.access.log`
Error logs: `nginx/logs/educorenextgen.error.log`

View live logs:
```bash
tail -f logs/educorenextgen.access.log
tail -f logs/educorenextgen.error.log
```

## Customization

To customize Nginx configuration:
1. Edit `conf.d/educorenextgen.conf`
2. Test: `docker-compose -f docker-compose.nginx.yml exec nginx nginx -t`
3. Reload: `docker-compose -f docker-compose.nginx.yml exec nginx nginx -s reload`

## Documentation

See `../NGINX_SETUP.md` for complete setup guide.
