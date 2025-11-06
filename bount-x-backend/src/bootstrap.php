<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Load configuration
$config = require __DIR__ . '/../config/app.php';

// Set up error reporting
error_reporting(E_ALL);
ini_set('display_errors', $config['debug'] ? '1' : '0');

// Initialize the application
$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => $config['debug'],
    ],
]);

// Middleware
$app->add(new \App\Middleware\AuthMiddleware());

// Load routes
require __DIR__ . '/Routes/api.php';

// Run the application
$app->run();