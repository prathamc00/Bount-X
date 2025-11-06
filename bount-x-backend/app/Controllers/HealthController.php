<?php

namespace App\Controllers;

use App\Models\Database;

class HealthController
{
    public function check()
    {
        try {
            // Test database connection
            $pdo = Database::pdo();
            $stmt = $pdo->query("SELECT 1");
            $dbStatus = $stmt ? 'connected' : 'disconnected';
        } catch (Exception $e) {
            $dbStatus = 'error';
        }
        
        return [
            'status' => 'ok',
            'timestamp' => date('Y-m-d H:i:s'),
            'database' => $dbStatus,
            'version' => '1.0.0'
        ];
    }
}