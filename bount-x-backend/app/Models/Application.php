<?php

namespace App\Models;

class Application
{
    public static function all(array $filters = [])
    {
        $sql = "SELECT * FROM applications WHERE 1=1";
        $params = [];
        if (!empty($filters['status'])) { $sql .= " AND status = ?"; $params[] = $filters['status']; }
        if (!empty($filters['q'])) { $sql .= " AND (full_name LIKE ? OR email LIKE ?)"; $params[] = "%{$filters['q']}%"; $params[] = "%{$filters['q']}%"; }
        $sql .= " ORDER BY created_at DESC";
        $stmt = Database::pdo()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function updateStatus(int $id, string $status)
    {
        $stmt = Database::pdo()->prepare("UPDATE applications SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }
}