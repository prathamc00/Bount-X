<?php

use Dotenv\Dotenv;

$base = dirname(__DIR__);
if (file_exists($base.'/.env')) {
    $dotenv = Dotenv::createImmutable($base);
    $dotenv->load();
}

return [
    'host' => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'port' => $_ENV['DB_PORT'] ?? '3306',
    'database' => $_ENV['DB_DATABASE'] ?? 'bountx',
    'username' => $_ENV['DB_USERNAME'] ?? 'root',
    'password' => $_ENV['DB_PASSWORD'] ?? '',
    'charset' => 'utf8mb4'
];

