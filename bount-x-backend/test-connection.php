<?php
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

echo "=== Testing Database Connection ===\n";

try {
    $config = require __DIR__ . '/config/database.php';
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "✓ Database connection successful\n";
    
    // Test tables exist
    $tables = ['users', 'applications', 'meetups', 'hackathons', 'build_projects', 'metrics'];
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "✓ Table '$table' exists\n";
        } else {
            echo "✗ Table '$table' missing\n";
        }
    }
    
    // Test admin user exists
    $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE email = ?");
    $stmt->execute(['admin@bountx.com']);
    $admin = $stmt->fetch();
    
    if ($admin) {
        echo "✓ Admin user exists: {$admin['name']} ({$admin['email']}) - Role: {$admin['role']}\n";
    } else {
        echo "✗ Admin user not found\n";
    }
    
    // Test metrics data
    $stmt = $pdo->query("SELECT key_name, value FROM metrics");
    $metrics = $stmt->fetchAll();
    echo "✓ Metrics table has " . count($metrics) . " entries\n";
    
} catch (Exception $e) {
    echo "✗ Database error: " . $e->getMessage() . "\n";
}

echo "\n=== Testing API Endpoints ===\n";

function testEndpoint($url, $method = 'GET', $data = null, $headers = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $defaultHeaders = ['Content-Type: application/json'];
    $allHeaders = array_merge($defaultHeaders, $headers);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $allHeaders);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'response' => $response,
        'error' => $error
    ];
}

$baseUrl = 'http://localhost:8000/api';

// Test health endpoint
echo "Testing health endpoint...\n";
$result = testEndpoint($baseUrl . '/health');
if ($result['code'] === 200) {
    echo "✓ Health check passed\n";
    $health = json_decode($result['response'], true);
    if ($health && $health['database'] === 'connected') {
        echo "✓ Database connection confirmed via API\n";
    }
} else {
    echo "✗ Health check failed: {$result['code']} - {$result['error']}\n";
}

// Test admin login
echo "Testing admin login...\n";
$loginData = ['email' => 'admin@bountx.com', 'password' => 'admin123'];
$result = testEndpoint($baseUrl . '/admin/auth/login', 'POST', $loginData);

if ($result['code'] === 200) {
    echo "✓ Admin login successful\n";
    $loginResponse = json_decode($result['response'], true);
    
    if ($loginResponse && isset($loginResponse['token'])) {
        $token = $loginResponse['token'];
        echo "✓ JWT token received\n";
        
        // Test authenticated endpoint
        echo "Testing authenticated endpoint (KPIs)...\n";
        $authHeaders = ['Authorization: Bearer ' . $token];
        $result = testEndpoint($baseUrl . '/admin/stats/kpis', 'GET', null, $authHeaders);
        
        if ($result['code'] === 200) {
            echo "✓ Authenticated endpoint working\n";
            $kpis = json_decode($result['response'], true);
            if ($kpis) {
                echo "✓ KPI data: " . json_encode($kpis) . "\n";
            }
        } else {
            echo "✗ Authenticated endpoint failed: {$result['code']}\n";
            echo "Response: {$result['response']}\n";
        }
        
    } else {
        echo "✗ No token in login response\n";
        echo "Response: {$result['response']}\n";
    }
} else {
    echo "✗ Admin login failed: {$result['code']}\n";
    echo "Response: {$result['response']}\n";
}

// Test public application submission
echo "Testing public application submission...\n";
$appData = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+1234567890',
    'skill' => 'Developer',
    'experience' => 'Mid-Level',
    'portfolioUrl' => 'https://test.dev',
    'reason' => 'Testing the API'
];

$result = testEndpoint($baseUrl . '/applications', 'POST', $appData);
if ($result['code'] === 201) {
    echo "✓ Application submission successful\n";
} else {
    echo "✗ Application submission failed: {$result['code']}\n";
    echo "Response: {$result['response']}\n";
}

echo "\n=== Connection Test Complete ===\n";