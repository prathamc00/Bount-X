<?php

namespace App\Controllers\Admin;

use App\Models\Database;

class HackathonController
{
    public function upcoming()
    {
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->query("SELECT * FROM hackathons WHERE is_upcoming = 1 LIMIT 1");
            $hackathon = $stmt->fetch();
            
            if (!$hackathon) {
                return [];
            }
            
            return [
                'id' => $hackathon['id'],
                'title' => $hackathon['title'],
                'theme' => $hackathon['theme'],
                'start_date' => $hackathon['start_date'],
                'end_date' => $hackathon['end_date'],
                'registration_url' => $hackathon['registration_url'],
                'prizes' => json_decode($hackathon['prizes'] ?? '[]', true)
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch upcoming hackathon'];
        }
    }

    public function updateUpcoming()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $pdo = Database::pdo();
            
            // First, set all hackathons as not upcoming
            $pdo->query("UPDATE hackathons SET is_upcoming = 0");
            
            // Check if we're updating existing or creating new
            if (!empty($data['id'])) {
                // Update existing
                $stmt = $pdo->prepare("
                    UPDATE hackathons 
                    SET title = ?, theme = ?, start_date = ?, end_date = ?, 
                        registration_url = ?, prizes = ?, is_upcoming = 1 
                    WHERE id = ?
                ");
                $stmt->execute([
                    $data['title'],
                    $data['theme'],
                    $data['start_date'],
                    $data['end_date'],
                    $data['registration_url'],
                    json_encode($data['prizes'] ?? []),
                    $data['id']
                ]);
            } else {
                // Create new
                $stmt = $pdo->prepare("
                    INSERT INTO hackathons (title, theme, start_date, end_date, registration_url, prizes, is_upcoming) 
                    VALUES (?, ?, ?, ?, ?, ?, 1)
                ");
                $stmt->execute([
                    $data['title'],
                    $data['theme'],
                    $data['start_date'],
                    $data['end_date'],
                    $data['registration_url'],
                    json_encode($data['prizes'] ?? [])
                ]);
            }
            
            return ['success' => true, 'message' => 'Upcoming hackathon updated successfully'];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to update upcoming hackathon'];
        }
    }

    public function pastWinners()
    {
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->query("
                SELECT hp.*, h.title as hackathon_title 
                FROM hackathon_projects hp 
                LEFT JOIN hackathons h ON hp.hackathon_id = h.id 
                ORDER BY hp.year DESC, hp.id DESC
            ");
            $projects = $stmt->fetchAll();
            
            $formattedProjects = array_map(function($project) {
                return [
                    'id' => $project['id'],
                    'name' => $project['name'],
                    'team' => json_decode($project['team'] ?? '[]', true),
                    'description' => $project['description'],
                    'github_url' => $project['github_url'],
                    'prize' => $project['prize'],
                    'year' => $project['year'],
                    'hackathon_title' => $project['hackathon_title']
                ];
            }, $projects);
            
            return $formattedProjects;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch past winners'];
        }
    }

    public function addWinner()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $required = ['name', 'year'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    return ['error' => "Field '$field' is required"];
                }
            }
            
            $pdo = Database::pdo();
            $stmt = $pdo->prepare("
                INSERT INTO hackathon_projects (name, team, description, github_url, prize, year) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['name'],
                json_encode($data['team'] ?? []),
                $data['description'] ?? '',
                $data['github_url'] ?? '',
                $data['prize'] ?? '',
                $data['year']
            ]);
            
            $id = $pdo->lastInsertId();
            
            http_response_code(201);
            return ['success' => true, 'id' => $id, 'message' => 'Winner added successfully'];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to add winner'];
        }
    }

    public function deleteWinner($id)
    {
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->prepare("DELETE FROM hackathon_projects WHERE id = ?");
            $success = $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                return ['success' => true, 'message' => 'Winner deleted successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Winner not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to delete winner'];
        }
    }
}