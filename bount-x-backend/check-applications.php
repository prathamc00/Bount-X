<?php
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

echo "=== Checking Applications in Database ===\n\n";

try {
    $config = require __DIR__ . '/config/database.php';
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    // Get all applications
    $stmt = $pdo->query("SELECT * FROM applications ORDER BY created_at DESC");
    $applications = $stmt->fetchAll();
    
    echo "Total Applications Found: " . count($applications) . "\n\n";
    
    if (count($applications) > 0) {
        echo "Applications Details:\n";
        echo str_repeat("=", 80) . "\n";
        
        foreach ($applications as $index => $app) {
            echo "Application #" . ($index + 1) . "\n";
            echo "ID: {$app['id']}\n";
            echo "Name: {$app['full_name']}\n";
            echo "Email: {$app['email']}\n";
            echo "Phone: {$app['phone']}\n";
            echo "Skill: {$app['skill']}\n";
            echo "Experience: {$app['experience']}\n";
            echo "Portfolio URL: {$app['portfolio_url']}\n";
            echo "Reason: " . substr($app['reason'], 0, 100) . (strlen($app['reason']) > 100 ? '...' : '') . "\n";
            echo "Status: {$app['status']}\n";
            echo "Submitted: {$app['created_at']}\n";
            echo "Updated: {$app['updated_at']}\n";
            echo str_repeat("-", 80) . "\n";
        }
        
        // Show statistics
        echo "\nApplication Statistics:\n";
        $statusCounts = [];
        foreach ($applications as $app) {
            $status = $app['status'];
            $statusCounts[$status] = ($statusCounts[$status] ?? 0) + 1;
        }
        
        foreach ($statusCounts as $status => $count) {
            echo "- $status: $count applications\n";
        }
        
        // Show skill distribution
        echo "\nSkill Distribution:\n";
        $skillCounts = [];
        foreach ($applications as $app) {
            $skill = $app['skill'];
            $skillCounts[$skill] = ($skillCounts[$skill] ?? 0) + 1;
        }
        
        foreach ($skillCounts as $skill => $count) {
            echo "- $skill: $count applications\n";
        }
        
        // Show experience distribution
        echo "\nExperience Distribution:\n";
        $expCounts = [];
        foreach ($applications as $app) {
            $exp = $app['experience'];
            $expCounts[$exp] = ($expCounts[$exp] ?? 0) + 1;
        }
        
        foreach ($expCounts as $exp => $count) {
            echo "- $exp: $count applications\n";
        }
        
    } else {
        echo "No applications found in the database.\n";
        echo "You can submit a test application using:\n";
        echo "- Frontend: http://localhost:3000 (use the application form)\n";
        echo "- API: POST to http://localhost:8000/api/applications\n";
    }
    
    // Also check metrics
    echo "\n=== Current Metrics ===\n";
    $stmt = $pdo->query("SELECT key_name, value FROM metrics");
    $metrics = $stmt->fetchAll();
    
    foreach ($metrics as $metric) {
        echo "{$metric['key_name']}: {$metric['value']}\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== Check Complete ===\n";