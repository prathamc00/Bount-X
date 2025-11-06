<?php
$baseUrl = 'http://localhost:8000/api';

// Test login and extract token manually
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/auth/login');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['email' => 'admin@bountx.com', 'password' => 'admin123']));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Login Response Code: $httpCode\n";
echo "Response Length: " . strlen($response) . "\n";

// Try to extract token using regex
if (preg_match('/"token":"([^"]+)"/', $response, $matches)) {
    $token = $matches[1];
    echo "✓ Token extracted successfully\n";
    echo "Token: " . substr($token, 0, 50) . "...\n";
    
    // Now test authenticated endpoint
    echo "\nTesting authenticated endpoint with extracted token...\n";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/stats/kpis');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $kpiResponse = curl_exec($ch);
    $kpiCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "KPI Response Code: $kpiCode\n";
    echo "KPI Response: $kpiResponse\n";
    
    if ($kpiCode === 200) {
        echo "✓ Authentication working correctly!\n";
    } else {
        echo "✗ Authentication failed\n";
    }
    
} else {
    echo "✗ Could not extract token from response\n";
    echo "Raw response: $response\n";
}

// Also test a few more endpoints
echo "\n=== Testing Other Endpoints ===\n";

if (isset($token)) {
    $endpoints = [
        '/admin/applications' => 'Applications',
        '/admin/meetups' => 'Meetups',
        '/admin/build-projects' => 'Build Projects'
    ];
    
    foreach ($endpoints as $endpoint => $name) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        echo "$name: Status $code ";
        if ($code === 200) {
            echo "✓\n";
            $data = json_decode($response, true);
            if (is_array($data)) {
                echo "  Found " . count($data) . " items\n";
            }
        } else {
            echo "✗\n";
        }
    }
}

echo "\n=== Backend-Database Connection Test Complete ===\n";