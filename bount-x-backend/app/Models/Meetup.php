<?php

namespace App\Models;

class Meetup
{
    public static function all()
    {
        return Database::pdo()->query("SELECT * FROM meetups ORDER BY starts_at DESC")->fetchAll();
    }

    public static function create($data)
    {
        $stmt = Database::pdo()->prepare("INSERT INTO meetups (title, description, starts_at, venue) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['starts_at'] ?? null, $data['venue'] ?? null]);
        return Database::pdo()->lastInsertId();
    }

    public static function update($id, $data)
    {
        $stmt = Database::pdo()->prepare("UPDATE meetups SET title=?, description=?, starts_at=?, venue=? WHERE id=?");
        return $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['starts_at'] ?? null, $data['venue'] ?? null, $id]);
    }

    public static function delete($id)
    {
        $stmt = Database::pdo()->prepare("DELETE FROM meetups WHERE id = ?");
        return $stmt->execute([$id]);
    }
}