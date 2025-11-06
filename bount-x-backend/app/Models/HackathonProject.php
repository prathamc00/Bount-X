<?php

namespace App\Models;

class HackathonProject
{
    public static function upcoming()
    {
        $stmt = Database::pdo()->query("SELECT * FROM hackathons WHERE is_upcoming = 1 ORDER BY starts_at LIMIT 1");
        return $stmt->fetch();
    }

    public static function updateUpcoming($data)
    {
        // set all is_upcoming=0, then update/insert upcoming
        $pdo = Database::pdo();
        $pdo->beginTransaction();
        $pdo->exec("UPDATE hackathons SET is_upcoming = 0");
        if (!empty($data['id'])) {
            $stmt = $pdo->prepare("UPDATE hackathons SET title=?, description=?, starts_at=?, ends_at=?, is_upcoming=1 WHERE id=?");
            $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['starts_at'] ?? null, $data['ends_at'] ?? null, $data['id']]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO hackathons (title, description, starts_at, ends_at, is_upcoming) VALUES (?, ?, ?, ?, 1)");
            $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['starts_at'] ?? null, $data['ends_at'] ?? null]);
        }
        $pdo->commit();
        return true;
    }

    public static function pastWinners()
    {
        $stmt = Database::pdo()->query("SELECT * FROM hackathons WHERE is_upcoming = 0 ORDER BY starts_at DESC");
        return $stmt->fetchAll();
    }

    public static function addWinner($data)
    {
        $stmt = Database::pdo()->prepare("INSERT INTO hackathons (title, description, starts_at, ends_at, is_upcoming) VALUES (?, ?, ?, ?, 0)");
        $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['starts_at'] ?? null, $data['ends_at'] ?? null]);
        return Database::pdo()->lastInsertId();
    }

    public static function deleteWinner($id)
    {
        $stmt = Database::pdo()->prepare("DELETE FROM hackathons WHERE id = ?");
        return $stmt->execute([$id]);
    }
}