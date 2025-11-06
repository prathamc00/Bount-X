<?php

namespace App\Controllers\Admin;

use App\Models\BuildProject;

class BuildProjectController
{
    public function index()
    {
        try {
            $projects = BuildProject::all();
            
            $formattedProjects = array_map(function($project) {
                return [
                    'id' => $project['id'],
                    'title' => $project['title'],
                    'creator' => $project['creator'],
                    'description' => $project['description'],
                    'status' => $project['status'],
                    'image' => $project['image'],
                    'repo_url' => $project['repo_url'],
                    'tech_stack' => json_decode($project['tech_stack'] ?? '[]', true),
                    'created_at' => $project['created_at']
                ];
            }, $projects);
            
            return $formattedProjects;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch build projects'];
        }
    }

    public function store()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $required = ['title', 'description'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    return ['error' => "Field '$field' is required"];
                }
            }
            
            $id = BuildProject::create(
                $data['title'],
                $data['description'],
                $data['image'] ?? null,
                $data['repo_url'] ?? null
            );
            
            // Update creator and tech_stack if provided
            if (!empty($data['creator']) || !empty($data['tech_stack']) || !empty($data['status'])) {
                $updateData = [
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'repo_url' => $data['repo_url'] ?? null
                ];
                
                // Add additional fields via direct query since the create method is limited
                $pdo = \App\Models\Database::pdo();
                $stmt = $pdo->prepare("
                    UPDATE build_projects 
                    SET creator = ?, tech_stack = ?, status = ? 
                    WHERE id = ?
                ");
                $stmt->execute([
                    $data['creator'] ?? '',
                    json_encode($data['tech_stack'] ?? []),
                    $data['status'] ?? 'In Progress',
                    $id
                ]);
            }
            
            http_response_code(201);
            return ['success' => true, 'id' => $id, 'message' => 'Build project created successfully'];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to create build project'];
        }
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Use direct database query for full update capability
            $pdo = \App\Models\Database::pdo();
            $stmt = $pdo->prepare("
                UPDATE build_projects 
                SET title = ?, description = ?, creator = ?, status = ?, 
                    repo_url = ?, tech_stack = ?, image = ?
                WHERE id = ?
            ");
            
            $success = $stmt->execute([
                $data['title'] ?? '',
                $data['description'] ?? '',
                $data['creator'] ?? '',
                $data['status'] ?? 'In Progress',
                $data['repo_url'] ?? '',
                json_encode($data['tech_stack'] ?? []),
                $data['image'] ?? '',
                $id
            ]);
            
            if ($stmt->rowCount() > 0) {
                return ['success' => true, 'message' => 'Build project updated successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Build project not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to update build project'];
        }
    }

    public function destroy($id)
    {
        try {
            $success = BuildProject::delete($id);
            
            if ($success) {
                return ['success' => true, 'message' => 'Build project deleted successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Build project not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to delete build project'];
        }
    }
}