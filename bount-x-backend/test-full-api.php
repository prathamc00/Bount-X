<?php
$baseUrl = 'http://localhost:8000/api';

// Test login and get token
echo "=== Testing Admin Login ===\n";
$loginData = json_encode(['email' => 'admin@bountx.com', 'password' => 'admin123']);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/auth/login');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $loginResponse = json_decode($response, true);
    $token = $loginResponse['token'];
    echo "✓ Login successful!\n\n";
    
    // Test KPIs endpoint
    echo "=== Testing KPIs Endpoint ===\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/stats/kpis');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "Status: $httpCode\n";
    echo "Response: $response\n\n";
    
    // Test applications endpoint
    echo "=== Testing Applications Endpoint ===\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/applications');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "Status: $httpCode\n";
    echo "Response: $response\n\n";
    
    // Test public application submission
    echo "=== Testing Public Application Submission ===\n";
    $applicationData = json_encode([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+1234567890',
        'skill' => 'Developer',
        'experience' => 'Mid-Level',
        'portfolioUrl' => 'https://johndoe.dev',
        'reason' => 'I want to contribute to the community and learn from others.'
    ]);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/applications');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $applicationData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "Status: $httpCode\n";
    echo "Response: $response\n\n";
    
    // Test applications endpoint again to see the new application
    echo "=== Testing Applications Endpoint (After Submission) ===\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/applications');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "Status: $httpCode\n";
    echo "Response: $response\n\n";
    
} else {
    echo "✗ Login failed: $response\n";
}

echo "=== Testing Complete ===\n";