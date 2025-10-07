#!/bin/bash

BASE_URL="http://localhost:8080"

test_health() {
    response=$(curl -s "$BASE_URL/health")
    if echo "$response" | grep -q '"status":"ok"'; then
        echo "Health check passed"
        echo "Response: $response"
    else
        echo "Health check failed"
        echo "Response: $response"
    fi
}

test_health