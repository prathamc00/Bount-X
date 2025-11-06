<?php
/**
 * BounT-X Backend Setup Script
 * Run this script to initialize the database and create required tables
 */

require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

$config = require __DIR__ . '/config/database.php';

try {
    // Connect to MySQL server (without database)
    $dsn = "mysql:host={$config['host']};port={$config['port']};charset={$config['charset']}";
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "Connected to MySQL server successfully.\n";
    
    // Read and execute the schema file
    $schema = file_get_contents(__DIR__ . '/database/schema.sql');
    $statements = explode(';', $schema);
    
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            $pdo->exec($statement);
        }
    }
    
    echo "Database schema created successfully.\n";
    echo "Setup completed! You can now start the server.\n";
    echo "\nTo start the development server:\n";
    echo "php -S localhost:8000 -t public/\n";
    
} catch (PDOException $e) {
    echo "Database setup failed: " . $e->getMessage() . "\n";
    echo "\nPlease check your database configuration in .env file:\n";
    echo "DB_HOST={$config['host']}\n";
    echo "DB_PORT={$config['port']}\n";
    echo "DB_DATABASE={$config['database']}\n";
    echo "DB_USERNAME={$config['username']}\n";
    echo "DB_PASSWORD=***\n";
    exit(1);
} catch (Exception $e) {
    echo "Setup failed: " . $e->getMessage() . "\n";
    exit(1);
}