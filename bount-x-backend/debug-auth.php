<?php
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

// Test JWT creation and decoding
$secret = $_ENV['JWT_SECRET'] ?? 'secret';
echo "JWT Secret: $secret\n";

$payload = [
    'iss' => $_ENV['APP_URL'] ?? 'http://localhost',
    'iat' => time(),
    'exp' => time() + 3600,
    'sub' => 1,
    'role' => 'admin',
];

$token = JWT::encode($payload, $secret, 'HS256');
echo "Generated Token: $token\n";

try {
    $decoded = JWT::decode($token, new Key($secret, 'HS256'));
    echo "Decoded successfully:\n";
    print_r($decoded);
} catch (Exception $e) {
    echo "Decode error: " . $e->getMessage() . "\n";
}

// Test with the actual token from login
echo "\n=== Testing with actual login token ===\n";
$loginUrl = 'http://localhost:8000/api/admin/auth/login';
$loginData = json_encode(['email' => 'admin@bountx.com', 'password' => 'admin123']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $loginUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$loginResponse = json_decode($response, true);
if (isset($loginResponse['token'])) {
    $actualToken = $loginResponse['token'];
    echo "Actual Token: $actualToken\n";
    
    try {
        $decoded = JWT::decode($actualToken, new Key($secret, 'HS256'));
        echo "Actual token decoded successfully:\n";
        print_r($decoded);
    } catch (Exception $e) {
        echo "Actual token decode error: " . $e->getMessage() . "\n";
    }
} else {
    echo "Failed to get token from login\n";
}