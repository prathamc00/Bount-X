<?php

namespace App\Models;

class User
{
    public static function findByEmail(string $email)
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public static function findById(int $id)
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}