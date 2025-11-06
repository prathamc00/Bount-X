<?php

namespace App\Models;

class Database
{
    private static $pdo;

    public static function pdo()
    {
        if (self::$pdo) return self::$pdo;
        $config = require __DIR__ . '/../../config/database.php';
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}";
        $opt = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        ];
        self::$pdo = new \PDO($dsn, $config['username'], $config['password'], $opt);
        return self::$pdo;
    }
}