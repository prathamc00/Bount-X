<?php

namespace App\Controllers;

use App\Models\Project;
use App\Services\StorageService;

class ProjectController
{
    protected $projectModel;
    protected $storageService;

    public function __construct()
    {
        $this->projectModel = new Project();
        $this->storageService = new StorageService();
    }

    public function createProject($data)
    {
        // Validate and create a new project
        $projectData = $this->validateProjectData($data);
        return $this->projectModel->create($projectData);
    }

    public function updateProject($id, $data)
    {
        // Validate and update the existing project
        $projectData = $this->validateProjectData($data);
        return $this->projectModel->update($id, $projectData);
    }

    public function getProject($id)
    {
        // Fetch project details by ID
        return $this->projectModel->find($id);
    }

    public function getAllProjects()
    {
        // Fetch all projects
        return $this->projectModel->all();
    }

    protected function validateProjectData($data)
    {
        // Implement validation logic for project data
        // For example, check required fields, data types, etc.
        return $data; // Return validated data
    }
}