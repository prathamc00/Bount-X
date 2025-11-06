<?php

namespace App\Controllers;

use Firebase\JWT\JWT;
use App\Models\User;

class AuthController
{
    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = User::findByEmail($email);
        if (!$user || !password_verify($password, $user['password_hash'])) {
            http_response_code(401);
            return ['error' => 'Invalid credentials'];
        }

        $secret = $_ENV['JWT_SECRET'] ?? 'secret';
        $ttl = intval($_ENV['JWT_TTL'] ?? 3600);
        $now = time();
        $payload = [
            'iss' => $_ENV['APP_URL'] ?? 'http://localhost',
            'iat' => $now,
            'exp' => $now + $ttl,
            'sub' => $user['id'],
            'role' => $user['role'],
        ];
        $token = JWT::encode($payload, $secret, 'HS256');
        return ['token' => $token, 'expires_in' => $ttl];
    }
}