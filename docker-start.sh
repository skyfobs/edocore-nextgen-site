#!/bin/bash

# Docker Quick Start Script for EduCore NextGen Website

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 EduCore NextGen - Docker Setup${NC}"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    echo "Please install Docker Compose first"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "Creating .env file..."
    cat > .env << EOF
TELEGRAM_BOT_TOKEN=8523506491:AAFU7ysb4OwgZQA-HeR2iXAyp-q9bKockUU
TELEGRAM_CHAT_ID=-5087350776
NODE_ENV=production
EOF
    echo -e "${GREEN}✅ Created .env file${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi
echo ""

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
    echo "Creating data directory..."
    mkdir -p data
    echo -e "${GREEN}✅ Created data directory${NC}"
else
    echo -e "${GREEN}✅ Data directory exists${NC}"
fi
echo ""

# Ask user what to do
echo "What would you like to do?"
echo "1) Build and start containers"
echo "2) Start existing containers"
echo "3) Stop containers"
echo "4) View logs"
echo "5) Rebuild from scratch"
echo "6) Clean up (remove containers and images)"
echo ""
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}Building and starting containers...${NC}"
        docker-compose up -d --build
        echo ""
        echo -e "${GREEN}✅ Containers started!${NC}"
        echo ""
        echo "Access your application at: http://localhost:3000"
        echo "View logs with: docker-compose logs -f"
        ;;
    2)
        echo ""
        echo -e "${BLUE}Starting containers...${NC}"
        docker-compose up -d
        echo ""
        echo -e "${GREEN}✅ Containers started!${NC}"
        echo ""
        echo "Access your application at: http://localhost:3000"
        ;;
    3)
        echo ""
        echo -e "${BLUE}Stopping containers...${NC}"
        docker-compose down
        echo ""
        echo -e "${GREEN}✅ Containers stopped!${NC}"
        ;;
    4)
        echo ""
        echo -e "${BLUE}Viewing logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f
        ;;
    5)
        echo ""
        echo -e "${BLUE}Rebuilding from scratch...${NC}"
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        echo ""
        echo -e "${GREEN}✅ Rebuild complete!${NC}"
        echo ""
        echo "Access your application at: http://localhost:3000"
        ;;
    6)
        echo ""
        echo -e "${YELLOW}⚠️  This will remove all containers and images${NC}"
        read -p "Are you sure? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo ""
            echo -e "${BLUE}Cleaning up...${NC}"
            docker-compose down -v
            docker rmi educore-website_educore-web 2>/dev/null || true
            echo ""
            echo -e "${GREEN}✅ Cleanup complete!${NC}"
        else
            echo "Cancelled"
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
