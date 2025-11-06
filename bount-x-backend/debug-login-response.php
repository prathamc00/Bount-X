<?php
$loginUrl = 'http://localhost:8000/api/admin/auth/login';
$loginData = json_encode(['email' => 'admin@bountx.com', 'password' => 'admin123']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $loginUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Error: $error\n";
echo "Raw Response: '$response'\n";
echo "Response Length: " . strlen($response) . "\n";

if ($response) {
    $decoded = json_decode($response, true);
    if ($decoded) {
        echo "Decoded Response:\n";
        print_r($decoded);
    } else {
        echo "JSON decode failed. JSON Error: " . json_last_error_msg() . "\n";
    }
}