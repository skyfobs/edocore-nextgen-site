#!/bin/bash

# Security Verification Script
# Run this after building to verify nothing sensitive is exposed

echo "🔒 EduCore Security Verification"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# Test 1: Check for Telegram credentials in build
echo "📱 Test 1: Checking for Telegram credentials..."
if grep -r "TELEGRAM_BOT_TOKEN\|TELEGRAM_CHAT_ID\|8523506491\|5087350776" .next/static 2>/dev/null | grep -q .; then
    echo -e "${RED}❌ FAIL: Telegram credentials found in build!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: No Telegram credentials in build${NC}"
fi
echo ""

# Test 2: Check for database code in client bundles
echo "💾 Test 2: Checking for database code..."
if grep -r "sqlite3\|saveChatbotConversation\|saveContactSubmission" .next/static 2>/dev/null | grep -q .; then
    echo -e "${RED}❌ FAIL: Database code found in client bundles!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: No database code in client bundles${NC}"
fi
echo ""

# Test 3: Check for .env files in build
echo "🔑 Test 3: Checking for .env files..."
if find .next -name ".env*" -type f 2>/dev/null | grep -q .; then
    echo -e "${RED}❌ FAIL: .env files found in build!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: No .env files in build${NC}"
fi
echo ""

# Test 4: Check for database files in build
echo "🗄️  Test 4: Checking for database files..."
if find .next -name "*.db" -type f 2>/dev/null | grep -q .; then
    echo -e "${RED}❌ FAIL: Database files found in build!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: No database files in build${NC}"
fi
echo ""

# Test 5: Verify database is outside public folder
echo "📁 Test 5: Checking database location..."
if [ -f "public/data/educore.db" ] || [ -d "public/data" ]; then
    echo -e "${RED}❌ FAIL: Database found in public folder!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: Database not in public folder${NC}"
fi
echo ""

# Test 6: Check .gitignore
echo "📝 Test 6: Checking .gitignore..."
GITIGNORE_OK=1
if ! grep -q "^/data$" .gitignore 2>/dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: /data not in .gitignore${NC}"
    GITIGNORE_OK=0
fi
if ! grep -q "^\\.env" .gitignore 2>/dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: .env* not in .gitignore${NC}"
    GITIGNORE_OK=0
fi
if ! grep -q "^\\*\\.db$" .gitignore 2>/dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: *.db not in .gitignore${NC}"
    GITIGNORE_OK=0
fi

if [ $GITIGNORE_OK -eq 1 ]; then
    echo -e "${GREEN}✅ PASS: .gitignore properly configured${NC}"
else
    echo -e "${YELLOW}⚠️  Some .gitignore entries missing (non-critical)${NC}"
fi
echo ""

# Test 7: Check for hardcoded secrets in code
echo "🔐 Test 7: Checking for hardcoded secrets..."
if grep -r "8523506491:AAFU7ysb4OwgZQA" app/ lib/ components/ 2>/dev/null | grep -v ".md" | grep -q .; then
    echo -e "${RED}❌ FAIL: Hardcoded bot token found in source code!${NC}"
    FAILED=$((FAILED + 1))
else
    echo -e "${GREEN}✅ PASS: No hardcoded secrets in source code${NC}"
fi
echo ""

# Final Summary
echo "================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All security tests passed!${NC}"
    echo ""
    echo "Your application is secure:"
    echo "  • Database protected ✓"
    echo "  • Credentials protected ✓"
    echo "  • Server code protected ✓"
    echo ""
    exit 0
else
    echo -e "${RED}❌ $FAILED test(s) failed!${NC}"
    echo ""
    echo "Please fix the issues above before deploying."
    echo ""
    exit 1
fi
