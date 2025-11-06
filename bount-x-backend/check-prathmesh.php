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

echo "=== Searching for Prathmesh Application ===\n\n";

// Search for prathmesh by name or email
$stmt = $pdo->prepare('SELECT * FROM applications WHERE full_name LIKE ? OR email LIKE ?');
$stmt->execute(['%prathmesh%', '%prathmesh%']);
$apps = $stmt->fetchAll();

if ($apps) {
    echo "Found " . count($apps) . " application(s) for prathmesh:\n";
    foreach ($apps as $app) {
        echo "ID: {$app['id']}\n";
        echo "Name: {$app['full_name']}\n";
        echo "Email: {$app['email']}\n";
        echo "Phone: {$app['phone']}\n";
        echo "Skill: {$app['skill']}\n";
        echo "Status: {$app['status']}\n";
        echo "Created: {$app['created_at']}\n";
        echo "---\n";
    }
} else {
    echo "No applications found for 'prathmesh'\n\n";
    
    // Show all recent applications
    echo "Recent applications in database:\n";
    $stmt = $pdo->query('SELECT id, full_name, email, created_at FROM applications ORDER BY created_at DESC LIMIT 10');
    while ($row = $stmt->fetch()) {
        echo "ID: {$row['id']}, Name: {$row['full_name']}, Email: {$row['email']}, Created: {$row['created_at']}\n";
    }
}

// Check total count
$stmt = $pdo->query('SELECT COUNT(*) as total FROM applications');
$total = $stmt->fetch()['total'];
echo "\nTotal applications in database: $total\n";