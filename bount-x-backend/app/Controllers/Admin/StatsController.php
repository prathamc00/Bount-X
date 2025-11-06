<?php

namespace App\Controllers\Admin;

use App\Models\Metric;
use App\Models\Database;

class StatsController
{
    public function kpis()
    {
        try {
            // Update metrics before returning
            $this->updateMetrics();
            
            $rows = Metric::all();
            $k = [];
            foreach ($rows as $r) {
                $k[$r['key_name']] = (int)$r['value'];
            }
            
            return [
                'newMembers' => $k['newMembers'] ?? 0,
                'applicationsPending' => $k['applicationsPending'] ?? 0,
                'upcomingEvents' => $k['upcomingEvents'] ?? 0,
                'activeProjects' => $k['activeProjects'] ?? 0,
            ];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch KPIs'];
        }
    }

    public function memberGrowth()
    {
        try {
            // Generate sample data for member growth over last 30 days
            $data = [];
            for ($i = 29; $i >= 0; $i--) {
                $date = date('Y-m-d', strtotime("-$i days"));
                $data[] = [
                    'date' => $date,
                    'members' => rand(50, 100) + $i // Sample growth data
                ];
            }
            
            return ['data' => $data];
        } catch (Exception $e) {
            return ['data' => []];
        }
    }

    public function skillDistribution()
    {
        try {
            $pdo = Database::pdo();
            $stmt = $pdo->query("
                SELECT skill, COUNT(*) as count 
                FROM applications 
                WHERE status = 'Approved' 
                GROUP BY skill
            ");
            $results = $stmt->fetchAll();
            
            $data = array_map(function($row) {
                return [
                    'skill' => $row['skill'],
                    'count' => (int)$row['count']
                ];
            }, $results);
            
            return ['data' => $data];
        } catch (Exception $e) {
            return ['data' => []];
        }
    }
    
    private function updateMetrics()
    {
        try {
            $pdo = Database::pdo();
            
            // Update pending applications count
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM applications WHERE status = 'Pending'");
            $pendingCount = $stmt->fetch()['count'];
            
            // Update upcoming events count
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM meetups WHERE starts_at > NOW()");
            $eventsCount = $stmt->fetch()['count'];
            
            // Update active projects count
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM build_projects WHERE status = 'In Progress'");
            $projectsCount = $stmt->fetch()['count'];
            
            // Update metrics table
            $updateStmt = $pdo->prepare("UPDATE metrics SET value = ? WHERE key_name = ?");
            $updateStmt->execute([$pendingCount, 'applicationsPending']);
            $updateStmt->execute([$eventsCount, 'upcomingEvents']);
            $updateStmt->execute([$projectsCount, 'activeProjects']);
            
        } catch (Exception $e) {
            // Log error but don't fail the request
        }
    }
}