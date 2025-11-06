<?php
use App\Controllers\AuthController;
use App\Controllers\Admin\ApplicationController;
use App\Controllers\Admin\MeetupController;
use App\Controllers\Admin\HackathonController;
use App\Controllers\Admin\BuildProjectController;
use App\Controllers\Admin\MetricController;
use App\Controllers\Admin\StatsController;
use App\Middleware\AuthMiddleware;

$path = parse_url($uri, PHP_URL_PATH);

// strip trailing slashes
$path = rtrim($path, '/');

$adminPrefix = '/api/admin';

if ($path === $adminPrefix . '/auth/login' && $method === 'POST') {
    (new AuthController())->login();
    exit;
}

// Protect /api/admin/*
if (strpos($path, $adminPrefix) === 0) {
    $user = (new AuthMiddleware())->handle();
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

// Stats
if ($path === $adminPrefix . '/stats/kpis' && $method === 'GET') {
    (new StatsController())->kpis();
    exit;
}

// Applications
if ($path === $adminPrefix . '/applications' && $method === 'GET') {
    (new ApplicationController())->index();
    exit;
}
if (preg_match('#^' . $adminPrefix . '/applications/(\d+)$#', $path, $m) && $method === 'PUT') {
    (new ApplicationController())->update($m[1]);
    exit;
}

// Meetups CRUD
if ($path === $adminPrefix . '/meetups' && $method === 'GET') {
    (new MeetupController())->index();
    exit;
}
if ($path === $adminPrefix . '/meetups' && $method === 'POST') {
    (new MeetupController())->store();
    exit;
}
if (preg_match('#^' . $adminPrefix . '/meetups/(\d+)$#', $path, $m) && $method === 'PUT') {
    (new MeetupController())->update($m[1]);
    exit;
}
if (preg_match('#^' . $adminPrefix . '/meetups/(\d+)$#', $path, $m) && $method === 'DELETE') {
    (new MeetupController())->destroy($m[1]);
    exit;
}

// Hackathons
if ($path === $adminPrefix . '/hackathons/upcoming' && $method === 'GET') {
    (new HackathonController())->upcoming();
    exit;
}
if ($path === $adminPrefix . '/hackathons/upcoming' && $method === 'PUT') {
    (new HackathonController())->updateUpcoming();
    exit;
}
if ($path === $adminPrefix . '/hackathons/past-winners' && $method === 'GET') {
    (new HackathonController())->pastWinners();
    exit;
}
if ($path === $adminPrefix . '/hackathons/past-winners' && $method === 'POST') {
    (new HackathonController())->addWinner();
    exit;
}
if (preg_match('#^' . $adminPrefix . '/hackathons/past-winners/(\d+)$#', $path, $m) && $method === 'DELETE') {
    (new HackathonController())->deleteWinner($m[1]);
    exit;
}

// Build Projects
if ($path === $adminPrefix . '/build-projects' && $method === 'GET') {
    (new BuildProjectController())->index();
    exit;
}
if ($path === $adminPrefix . '/build-projects' && $method === 'POST') {
    (new BuildProjectController())->store();
    exit;
}
if (preg_match('#^' . $adminPrefix . '/build-projects/(\d+)$#', $path, $m) && $method === 'PUT') {
    (new BuildProjectController())->update($m[1]);
    exit;
}
if (preg_match('#^' . $adminPrefix . '/build-projects/(\d+)$#', $path, $m) && $method === 'DELETE') {
    (new BuildProjectController())->destroy($m[1]);
    exit;
}

// Metrics
if ($path === $adminPrefix . '/metrics' && $method === 'GET') {
    (new MetricController())->index();
    exit;
}
if (preg_match('#^' . $adminPrefix . '/metrics/(\d+)$#', $path, $m) && $method === 'PUT') {
    (new MetricController())->update($m[1]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not Found']);