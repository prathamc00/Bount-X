<?php
$baseUrl = 'http://localhost:8000/api';

function makeRequest($url, $method = 'GET', $data = null, $headers = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $defaultHeaders = ['Content-Type: application/json'];
    $allHeaders = array_merge($defaultHeaders, $headers);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $allHeaders);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'response' => $response,
        'data' => json_decode($response, true)
    ];
}

echo "=== Testing Complete Authentication Flow ===\n\n";

// Step 1: Login
echo "1. Admin Login\n";
$loginResult = makeRequest($baseUrl . '/admin/auth/login', 'POST', [
    'email' => 'admin@bountx.com',
    'password' => 'admin123'
]);

echo "Status: {$loginResult['code']}\n";
if ($loginResult['code'] === 200 && $loginResult['data'] && isset($loginResult['data']['token'])) {
    $token = $loginResult['data']['token'];
    echo "✓ Login successful, token received\n";
    echo "Token length: " . strlen($token) . " characters\n\n";
    
    // Step 2: Test authenticated endpoints
    $authHeaders = ['Authorization: Bearer ' . $token];
    
    echo "2. Testing KPIs endpoint\n";
    $kpiResult = makeRequest($baseUrl . '/admin/stats/kpis', 'GET', null, $authHeaders);
    echo "Status: {$kpiResult['code']}\n";
    if ($kpiResult['code'] === 200) {
        echo "✓ KPIs retrieved successfully\n";
        echo "Data: " . json_encode($kpiResult['data']) . "\n\n";
    } else {
        echo "✗ KPIs failed\n";
        echo "Response: {$kpiResult['response']}\n\n";
    }
    
    echo "3. Testing Applications endpoint\n";
    $appsResult = makeRequest($baseUrl . '/admin/applications', 'GET', null, $authHeaders);
    echo "Status: {$appsResult['code']}\n";
    if ($appsResult['code'] === 200) {
        echo "✓ Applications retrieved successfully\n";
        $apps = $appsResult['data'];
        echo "Found " . count($apps) . " applications\n";
        if (count($apps) > 0) {
            echo "Latest application: {$apps[0]['name']} ({$apps[0]['email']})\n";
        }
        echo "\n";
    } else {
        echo "✗ Applications failed\n";
        echo "Response: {$appsResult['response']}\n\n";
    }
    
    echo "4. Testing Meetups endpoint\n";
    $meetupsResult = makeRequest($baseUrl . '/admin/meetups', 'GET', null, $authHeaders);
    echo "Status: {$meetupsResult['code']}\n";
    if ($meetupsResult['code'] === 200) {
        echo "✓ Meetups retrieved successfully\n";
        echo "Found " . count($meetupsResult['data']) . " meetups\n\n";
    } else {
        echo "✗ Meetups failed\n";
        echo "Response: {$meetupsResult['response']}\n\n";
    }
    
} else {
    echo "✗ Login failed\n";
    echo "Response: {$loginResult['response']}\n";
}

echo "5. Testing Public Endpoints\n";
$publicEndpoints = [
    '/health' => 'Health Check',
    '/meetups' => 'Public Meetups',
    '/hackathons/upcoming' => 'Upcoming Hackathon',
    '/build-projects' => 'Build Projects'
];

foreach ($publicEndpoints as $endpoint => $name) {
    $result = makeRequest($baseUrl . $endpoint);
    echo "$name: Status {$result['code']} ";
    echo $result['code'] === 200 ? "✓\n" : "✗\n";
}

echo "\n=== Authentication Flow Test Complete ===\n";