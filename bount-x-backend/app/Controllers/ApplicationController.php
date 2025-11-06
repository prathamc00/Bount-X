<?php

namespace App\Controllers;

use App\Models\Database;

class ApplicationController
{
    public function store()
    {
        $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        
        // Validate required fields
        $required = ['name', 'email', 'phone', 'skill', 'experience', 'portfolioUrl', 'reason'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                return ['error' => "Field '$field' is required"];
            }
        }
        
        // Validate skill and experience values
        $validSkills = ['Hacker', 'Designer', 'Developer'];
        $validExperience = ['Junior', 'Mid-Level', 'Senior'];
        
        if (!in_array($data['skill'], $validSkills)) {
            http_response_code(400);
            return ['error' => 'Invalid skill value'];
        }
        
        if (!in_array($data['experience'], $validExperience)) {
            http_response_code(400);
            return ['error' => 'Invalid experience value'];
        }
        
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->prepare("
                INSERT INTO applications (full_name, email, phone, skill, experience, portfolio_url, reason, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
            ");
            
            $stmt->execute([
                $data['name'],
                $data['email'],
                $data['phone'],
                $data['skill'],
                $data['experience'],
                $data['portfolioUrl'],
                $data['reason']
            ]);
            
            $applicationId = $pdo->lastInsertId();
            
            // Update pending applications count
            $this->updatePendingCount();
            
            http_response_code(201);
            return [
                'message' => 'Application submitted successfully',
                'id' => $applicationId
            ];
            
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to submit application'];
        }
    }
    
    private function updatePendingCount()
    {
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM applications WHERE status = 'Pending'");
            $count = $stmt->fetch()['count'];
            
            $updateStmt = $pdo->prepare("UPDATE metrics SET value = ? WHERE key_name = 'applicationsPending'");
            $updateStmt->execute([$count]);
        } catch (Exception $e) {
            // Log error but don't fail the application submission
        }
    }
}