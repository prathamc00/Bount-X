<?php

namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;

class AuthMiddleware
{
    public function handle()
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        
        if (!$authHeader || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return false;
        }
        
        $token = $matches[1];
        $secret = $_ENV['JWT_SECRET'] ?? 'secret';
        
        try {
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            $user = User::findById($decoded->sub);
            
            if (!$user || $user['role'] !== 'admin') {
                return false;
            }
            
            return $user;
        } catch (\Exception $e) {
            return false;
        }
    }
}