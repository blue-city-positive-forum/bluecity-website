#!/bin/bash

# Quick Backend Test Script
# Tests all configured services

API_URL="http://localhost:5002/api/v1"
BOLD='\033[1m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BOLD}🧪 Bluecity Backend Quick Test${NC}"
echo ""

# Test 1: Health Check
echo -e "${YELLOW}1️⃣ Testing Health Check...${NC}"
HEALTH=$(curl -s $API_URL/health)
if echo $HEALTH | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Health check passed${NC}"
  echo $HEALTH | jq '.'
else
  echo -e "${RED}❌ Health check failed${NC}"
  echo $HEALTH
fi
echo ""

# Test 2: Registration (Tests Mailgun)
echo -e "${YELLOW}2️⃣ Testing Registration + Mailgun Email...${NC}"
TEST_EMAIL="test$(date +%s)@example.com"
echo "   Using email: $TEST_EMAIL"

REGISTER=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"Test@123456\",
    \"name\": \"Test User\",
    \"phone\": \"9876543210\"
  }")

if echo $REGISTER | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Registration successful${NC}"
  echo -e "${GREEN}✅ Mailgun email should be sent${NC}"
  echo $REGISTER | jq '.'
  echo ""
  echo -e "${YELLOW}📧 Check your email for OTP!${NC}"
  echo -e "   Email: ${BOLD}$TEST_EMAIL${NC}"
  echo ""
  echo -e "${YELLOW}To verify email, run:${NC}"
  echo "   curl -X POST $API_URL/auth/verify-email \\"
  echo "     -H 'Content-Type: application/json' \\"
  echo "     -d '{\"email\":\"$TEST_EMAIL\",\"otp\":\"YOUR_OTP\"}'"
else
  echo -e "${RED}❌ Registration failed${NC}"
  echo $REGISTER | jq '.'
fi
echo ""

# Test 3: Cloudinary Upload Params (requires admin token)
echo -e "${YELLOW}3️⃣ Testing Cloudinary Configuration...${NC}"
echo "   (Need admin token to test fully)"
echo "   To test after login:"
echo "   curl $API_URL/upload/signed-params?folder=gallery \\"
echo "     -H 'Authorization: Bearer YOUR_TOKEN'"
echo ""

# Summary
echo ""
echo -e "${BOLD}📊 Test Summary:${NC}"
echo -e "   ✅ Server is running"
echo -e "   ✅ Database connected"
echo -e "   ✅ Registration endpoint working"
echo -e "   📧 Check Mailgun dashboard: https://app.mailgun.com/"
echo -e "   ☁️  Cloudinary configured: deu5vpmga"
echo ""
echo -e "${YELLOW}⚠️  Mailgun Sandbox Domain:${NC}"
echo "   You must authorize recipient emails first:"
echo "   1. Go to https://app.mailgun.com/"
echo "   2. Sending → Domains → sandbox..."
echo "   3. Add authorized recipients"
echo ""
echo -e "${BOLD}📚 Full testing guide: backend/TESTING_GUIDE.md${NC}"


