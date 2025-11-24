#!/bin/bash

# Backend API Testing Script
# Make sure the backend server is running on localhost:8080

BASE_URL="http://localhost:8080"
TOKEN=""

echo "=== Testing Backend APIs ==="
echo ""

# Test 1: Health Check
echo "1. Testing Health Check (GET /health)"
curl -X GET "$BASE_URL/health" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

# Test 2: Register User
echo "2. Testing User Registration (POST /auth/register)"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }' \
  -w "\nStatus: %{http_code}")

echo "$REGISTER_RESPONSE"
echo ""

# Test 3: Login
echo "3. Testing User Login (POST /auth/login)"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }' \
  -w "\nStatus: %{http_code}")

echo "$LOGIN_RESPONSE"

# Extract token from login response (if successful)
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

if [ -z "$TOKEN" ]; then
  echo "⚠️  Login failed or token not found. Skipping protected endpoints."
  exit 1
fi

echo "Token extracted: ${TOKEN:0:20}..."
echo ""

# Test 4: Protected Endpoint
echo "4. Testing Protected Endpoint (GET /api/protected)"
curl -X GET "$BASE_URL/api/protected" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -w "\nStatus: %{http_code}\n\n"

# Test 5: List Videos
echo "5. Testing List Videos (GET /api/videos)"
curl -X GET "$BASE_URL/api/videos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -w "\nStatus: %{http_code}\n\n"

# Test 6: Test without token (should fail)
echo "6. Testing Protected Endpoint without token (should fail)"
curl -X GET "$BASE_URL/api/protected" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

echo "=== API Tests Complete ==="

