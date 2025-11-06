<?php

namespace App\Controllers;

use App\Models\Application;
use App\Services\NotificationService;

class ApplicationController
{
    protected $applicationModel;
    protected $notificationService;

    public function __construct()
    {
        $this->applicationModel = new Application();
        $this->notificationService = new NotificationService();
    }

    public function getApplications()
    {
        return $this->applicationModel->getAll();
    }

    public function getApplication($id)
    {
        return $this->applicationModel->find($id);
    }

    public function createApplication($data)
    {
        $application = $this->applicationModel->create($data);
        $this->notificationService->sendApplicationReceivedNotification($application);
        return $application;
    }

    public function updateApplication($id, $data)
    {
        return $this->applicationModel->update($id, $data);
    }

    public function deleteApplication($id)
    {
        return $this->applicationModel->delete($id);
    }
}