<?php
$url = 'http://localhost:8000/api/admin/auth/login';
$data = json_encode([
    'email' => 'admin@bountx.com',
    'password' => 'admin123'
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "Response: $response\n";

if ($httpCode === 200) {
    $data = json_decode($response, true);
    if (isset($data['token'])) {
        echo "✓ Login successful! Token received.\n";
        echo "Token: " . substr($data['token'], 0, 50) . "...\n";
    }
} else {
    echo "✗ Login failed.\n";
}