#!/bin/bash

# Fix database permissions for Docker container
# Run this on your server before starting containers

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Fixing database permissions...${NC}"

# Create data directory if it doesn't exist
mkdir -p data

# Set ownership to match Docker container user (1001:1001)
# This matches the nextjs:nodejs user in the container
sudo chown -R 1001:1001 data/

# Set permissions
# Directory: rwxr-xr-x (755)
sudo chmod 755 data/

# Database file: rw-r--r-- (644) - if it exists
if [ -f "data/educore.db" ]; then
    sudo chmod 644 data/educore.db
    echo -e "${GREEN}✓ Fixed permissions for educore.db${NC}"
fi

# Journal file - if it exists
if [ -f "data/educore.db-journal" ]; then
    sudo chmod 644 data/educore.db-journal
    echo -e "${GREEN}✓ Fixed permissions for journal file${NC}"
fi

echo -e "${GREEN}✓ Permissions fixed!${NC}"
echo ""
echo "Owner: 1001:1001 (matches container user)"
echo "Directory: 755 (rwxr-xr-x)"
echo "Files: 644 (rw-r--r--)"
echo ""
echo "You can now start the containers:"
echo "  docker-compose -f docker-compose.nginx.yml up -d"
