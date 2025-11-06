<?php
require_once __DIR__ . '/vendor/autoload.php';

if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

$config = require __DIR__ . '/config/database.php';
$pdo = new PDO(
    "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}",
    $config['username'],
    $config['password'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$stmt = $pdo->query('SELECT COUNT(*) as total FROM applications');
$total = $stmt->fetch()['total'];
echo "Total applications: $total\n\n";

echo "Latest 5 applications:\n";
$stmt = $pdo->query('SELECT * FROM applications ORDER BY created_at DESC LIMIT 5');
while ($row = $stmt->fetch()) {
    echo "ID: {$row['id']}, Name: {$row['full_name']}, Email: {$row['email']}, Status: {$row['status']}, Created: {$row['created_at']}\n";
}