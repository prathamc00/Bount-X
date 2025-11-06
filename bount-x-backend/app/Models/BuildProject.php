<?php

namespace App\Models;

class BuildProject
{
    public static function all()
    {
        return Database::pdo()->query("SELECT * FROM build_projects ORDER BY created_at DESC")->fetchAll();
    }

    public static function create($title, $description, $imagePath = null, $repoUrl = null)
    {
        $stmt = Database::pdo()->prepare("INSERT INTO build_projects (title, description, image, repo_url) VALUES (?, ?, ?, ?)");
        $stmt->execute([$title, $description, $imagePath, $repoUrl]);
        return Database::pdo()->lastInsertId();
    }

    public static function update($id, $data)
    {
        $stmt = Database::pdo()->prepare("UPDATE build_projects SET title=?, description=?, repo_url=? WHERE id=?");
        return $stmt->execute([$data['title'] ?? null, $data['description'] ?? null, $data['repo_url'] ?? null, $id]);
    }

    public static function delete($id)
    {
        $stmt = Database::pdo()->prepare("DELETE FROM build_projects WHERE id = ?");
        return $stmt->execute([$id]);
    }
}