<?php

namespace App\Controllers;

use App\Models\BuildProject;

class BuildProjectController
{
    public function index()
    {
        try {
            $projects = BuildProject::all();
            
            // Transform data for frontend
            $formattedProjects = array_map(function($project) {
                return [
                    'id' => $project['id'],
                    'name' => $project['title'],
                    'creator' => $project['creator'] ?? 'Anonymous',
                    'description' => $project['description'],
                    'status' => $project['status'],
                    'imageUrl' => $project['image'] ?? '',
                    'techStack' => json_decode($project['tech_stack'] ?? '[]', true)
                ];
            }, $projects);
            
            return $formattedProjects;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch build projects'];
        }
    }
}