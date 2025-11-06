<?php
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

$config = require __DIR__ . '/config/database.php';

try {
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    $hash = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE email = ?');
    $result = $stmt->execute([$hash, 'admin@bountx.com']);
    
    if ($result && $stmt->rowCount() > 0) {
        echo "Admin password updated successfully!\n";
        echo "Email: admin@bountx.com\n";
        echo "Password: admin123\n";
    } else {
        echo "No admin user found to update. Creating new admin user...\n";
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
        $result = $stmt->execute(['Admin User', 'admin@bountx.com', $hash, 'admin']);
        if ($result) {
            echo "Admin user created successfully!\n";
        } else {
            echo "Failed to create admin user.\n";
        }
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}