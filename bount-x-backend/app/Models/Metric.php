<?php

namespace App\Models;

class Metric
{
    public static function all()
    {
        return Database::pdo()->query("SELECT * FROM metrics")->fetchAll();
    }

    public static function update($id, $value)
    {
        $stmt = Database::pdo()->prepare("UPDATE metrics SET value = ? WHERE id = ?");
        return $stmt->execute([(int)$value, $id]);
    }
}