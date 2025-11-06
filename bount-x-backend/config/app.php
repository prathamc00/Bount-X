<?php

return [
    'app_name' => 'Bount-X Community Platform',
    'app_env' => 'development',
    'app_debug' => true,
    'app_url' => 'http://localhost:8000',
    'cors' => [
        'allowed_origins' => ['*'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization'],
    ],
    'jwt' => [
        'secret' => env('JWT_SECRET', 'your_jwt_secret'),
        'ttl' => 60, // Token Time To Live in minutes
    ],
    'database' => [
        'default' => 'mysql',
        'connections' => [
            'mysql' => [
                'host' => env('DB_HOST', '127.0.0.1'),
                'port' => env('DB_PORT', '3306'),
                'database' => env('DB_DATABASE', 'bount_x'),
                'username' => env('DB_USERNAME', 'root'),
                'password' => env('DB_PASSWORD', ''),
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'prefix' => '',
                'strict' => true,
            ],
        ],
    ],
];