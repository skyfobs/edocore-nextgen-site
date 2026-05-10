#!/bin/bash

# SSL Certificate Setup Script for educorenextgen.com
# This script obtains Let's Encrypt SSL certificates

set -e

# Configuration
DOMAIN="educorenextgen.com"
DOMAIN_WWW="www.educorenextgen.com"
EMAIL="admin@educorenextgen.com"  # Change this to your email
STAGING=0  # Set to 1 for testing, 0 for production

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SSL Certificate Setup${NC}"
echo -e "${BLUE}  Domain: ${DOMAIN}${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed${NC}"
    exit 1
fi

# Create directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p nginx/logs

# Check if certificates already exist
if [ -d "certbot/conf/live/${DOMAIN}" ]; then
    echo -e "${YELLOW}Certificates already exist for ${DOMAIN}${NC}"
    read -p "Do you want to renew them? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}Skipping certificate generation${NC}"
        exit 0
    fi
    echo -e "${YELLOW}Removing existing certificates...${NC}"
    rm -rf certbot/conf/live/${DOMAIN}
    rm -rf certbot/conf/archive/${DOMAIN}
    rm -rf certbot/conf/renewal/${DOMAIN}.conf
fi

# Download recommended TLS parameters
echo -e "${YELLOW}Downloading recommended TLS parameters...${NC}"
if [ ! -e "certbot/conf/options-ssl-nginx.conf" ]; then
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > certbot/conf/options-ssl-nginx.conf
fi

if [ ! -e "certbot/conf/ssl-dhparams.pem" ]; then
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > certbot/conf/ssl-dhparams.pem
fi

# Create temporary Nginx config without SSL for certificate generation
echo -e "${YELLOW}Creating temporary Nginx configuration...${NC}"
cat > nginx/conf.d/temp.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name educorenextgen.com www.educorenextgen.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Rename the main config temporarily
if [ -f "nginx/conf.d/educorenextgen.conf" ]; then
    mv nginx/conf.d/educorenextgen.conf nginx/conf.d/educorenextgen.conf.bak
fi

# Start Nginx
echo -e "${YELLOW}Starting Nginx...${NC}"
docker-compose -f docker-compose.nginx.yml up -d nginx

# Wait for Nginx to be ready
echo -e "${YELLOW}Waiting for Nginx to be ready...${NC}"
sleep 5

# Request certificate
echo -e "${YELLOW}Requesting SSL certificate from Let's Encrypt...${NC}"

if [ $STAGING != "0" ]; then
    echo -e "${YELLOW}Running in STAGING mode (test certificate)${NC}"
    STAGING_ARG="--staging"
else
    echo -e "${GREEN}Running in PRODUCTION mode (real certificate)${NC}"
    STAGING_ARG=""
fi

docker-compose -f docker-compose.nginx.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    $STAGING_ARG \
    -d $DOMAIN \
    -d $DOMAIN_WWW

# Check if certificate was obtained
if [ ! -d "certbot/conf/live/${DOMAIN}" ]; then
    echo -e "${RED}Failed to obtain certificate${NC}"
    echo -e "${YELLOW}Cleaning up...${NC}"
    docker-compose -f docker-compose.nginx.yml down
    rm -f nginx/conf.d/temp.conf
    if [ -f "nginx/conf.d/educorenextgen.conf.bak" ]; then
        mv nginx/conf.d/educorenextgen.conf.bak nginx/conf.d/educorenextgen.conf
    fi
    exit 1
fi

# Certificate obtained successfully
echo -e "${GREEN}Certificate obtained successfully!${NC}"

# Restore main config
echo -e "${YELLOW}Restoring Nginx configuration...${NC}"
rm -f nginx/conf.d/temp.conf
if [ -f "nginx/conf.d/educorenextgen.conf.bak" ]; then
    mv nginx/conf.d/educorenextgen.conf.bak nginx/conf.d/educorenextgen.conf
fi

# Reload Nginx
echo -e "${YELLOW}Reloading Nginx with SSL configuration...${NC}"
docker-compose -f docker-compose.nginx.yml down
docker-compose -f docker-compose.nginx.yml up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Test SSL
echo -e "${YELLOW}Testing SSL configuration...${NC}"
if curl -sSf https://${DOMAIN} > /dev/null 2>&1; then
    echo -e "${GREEN}✓ HTTPS is working!${NC}"
else
    echo -e "${YELLOW}⚠ HTTPS test failed (service might still be starting)${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Your website is now available at:"
echo -e "  ${BLUE}https://${DOMAIN}${NC}"
echo -e "  ${BLUE}https://${DOMAIN_WWW}${NC}"
echo ""
echo -e "SSL certificate will auto-renew every 12 hours."
echo ""
echo -e "To check certificate status:"
echo -e "  ${YELLOW}docker-compose -f docker-compose.nginx.yml logs certbot${NC}"
echo ""
echo -e "To manually renew certificate:"
echo -e "  ${YELLOW}docker-compose -f docker-compose.nginx.yml run --rm certbot renew${NC}"
echo ""
