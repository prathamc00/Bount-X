<?php

namespace App\Controllers\Admin;

use App\Models\Metric;

class MetricController
{
    public function index()
    {
        try {
            $metrics = Metric::all();
            
            $formattedMetrics = array_map(function($metric) {
                return [
                    'id' => $metric['id'],
                    'key_name' => $metric['key_name'],
                    'value' => (int)$metric['value'],
                    'description' => $metric['description'] ?? '',
                    'updated_at' => $metric['updated_at']
                ];
            }, $metrics);
            
            return $formattedMetrics;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch metrics'];
        }
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['value'])) {
                http_response_code(400);
                return ['error' => 'Value is required'];
            }
            
            $success = Metric::update($id, $data['value']);
            
            if ($success) {
                return ['success' => true, 'message' => 'Metric updated successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Metric not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to update metric'];
        }
    }
}