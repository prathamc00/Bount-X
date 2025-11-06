<?php

namespace App\Controllers\Admin;

use App\Models\Application;
use App\Models\Database;

class ApplicationController
{
    public function index()
    {
        try {
            $filters = [
                'status' => $_GET['status'] ?? null, 
                'q' => $_GET['q'] ?? null
            ];
            
            $applications = Application::all($filters);
            
            // Transform data for frontend
            $formattedApplications = array_map(function($app) {
                return [
                    'id' => $app['id'],
                    'name' => $app['full_name'],
                    'email' => $app['email'],
                    'phone' => $app['phone'],
                    'skill' => $app['skill'],
                    'experience' => $app['experience'],
                    'portfolioUrl' => $app['portfolio_url'],
                    'reason' => $app['reason'],
                    'status' => $app['status'],
                    'submittedAt' => $app['created_at']
                ];
            }, $applications);
            
            return $formattedApplications;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch applications'];
        }
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['status'])) {
                http_response_code(400);
                return ['error' => 'Status is required'];
            }
            
            $validStatuses = ['Pending', 'Approved', 'Rejected'];
            if (!in_array($data['status'], $validStatuses)) {
                http_response_code(400);
                return ['error' => 'Invalid status value'];
            }
            
            $success = Application::updateStatus((int)$id, $data['status']);
            
            if ($success) {
                // Update pending applications count
                $this->updatePendingCount();
                return ['success' => true, 'message' => 'Application status updated'];
            } else {
                http_response_code(404);
                return ['error' => 'Application not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to update application'];
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
            // Log error but don't fail the update
        }
    }
}