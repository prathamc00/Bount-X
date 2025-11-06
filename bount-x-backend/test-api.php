<?php
/**
 * Simple API Test Script
 * Run this to test if the API endpoints are working correctly
 */

$baseUrl = 'http://localhost:8000/api';

function testEndpoint($url, $method = 'GET', $data = null) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return ['code' => $httpCode, 'response' => $response];
}

echo "Testing BounT-X API Endpoints...\n\n";

// Test health endpoint
echo "1. Testing Health Check...\n";
$result = testEndpoint($baseUrl . '/health');
echo "Status: {$result['code']}\n";
echo "Response: {$result['response']}\n\n";

// Test admin login
echo "2. Testing Admin Login...\n";
$loginData = [
    'email' => 'admin@bountx.com',
    'password' => 'admin123'
];
$result = testEndpoint($baseUrl . '/admin/auth/login', 'POST', $loginData);
echo "Status: {$result['code']}\n";
echo "Response: {$result['response']}\n\n";

// Test public endpoints
echo "3. Testing Public Endpoints...\n";

$endpoints = [
    '/meetups',
    '/hackathons/upcoming',
    '/hackathons/past-winners',
    '/build-projects'
];

foreach ($endpoints as $endpoint) {
    echo "Testing {$endpoint}...\n";
    $result = testEndpoint($baseUrl . $endpoint);
    echo "Status: {$result['code']}\n";
    if ($result['code'] === 200) {
        echo "✓ Success\n";
    } else {
        echo "✗ Failed: {$result['response']}\n";
    }
    echo "\n";
}

echo "API testing completed!\n";