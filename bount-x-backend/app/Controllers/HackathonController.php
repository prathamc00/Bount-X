<?php

namespace App\Controllers;

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
                'startDate' => $hackathon['start_date'],
                'endDate' => $hackathon['end_date'],
                'registrationUrl' => $hackathon['registration_url'],
                'prizes' => json_decode($hackathon['prizes'] ?? '[]', true)
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch upcoming hackathon'];
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
                    'githubUrl' => $project['github_url'],
                    'prize' => $project['prize'],
                    'year' => $project['year']
                ];
            }, $projects);
            
            return $formattedProjects;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch past winners'];
        }
    }
}