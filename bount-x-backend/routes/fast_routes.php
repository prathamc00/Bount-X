<?php

// Public routes (no authentication required)
$r->addRoute('POST', '/api/applications', [App\Controllers\ApplicationController::class, 'store']);
$r->addRoute('GET', '/api/health', [App\Controllers\HealthController::class, 'check']);

// Public data endpoints
$r->addRoute('GET', '/api/meetups', [App\Controllers\MeetupController::class, 'index']);
$r->addRoute('GET', '/api/hackathons/upcoming', [App\Controllers\HackathonController::class, 'upcoming']);
$r->addRoute('GET', '/api/hackathons/past-winners', [App\Controllers\HackathonController::class, 'pastWinners']);
$r->addRoute('GET', '/api/build-projects', [App\Controllers\BuildProjectController::class, 'index']);

// Admin Authentication
$r->addRoute('POST', '/api/admin/auth/login', [App\Controllers\AuthController::class, 'login']);

// Admin Stats
$r->addRoute('GET', '/api/admin/stats/kpis', [App\Controllers\Admin\StatsController::class, 'kpis']);
$r->addRoute('GET', '/api/admin/stats/member-growth', [App\Controllers\Admin\StatsController::class, 'memberGrowth']);
$r->addRoute('GET', '/api/admin/stats/skill-distribution', [App\Controllers\Admin\StatsController::class, 'skillDistribution']);

// Admin Applications
$r->addRoute('GET', '/api/admin/applications', [App\Controllers\Admin\ApplicationController::class, 'index']);
$r->addRoute('PUT', '/api/admin/applications/{id:\d+}', [App\Controllers\Admin\ApplicationController::class, 'update']);

// Admin Meetups
$r->addRoute('GET', '/api/admin/meetups', [App\Controllers\Admin\MeetupController::class, 'index']);
$r->addRoute('POST', '/api/admin/meetups', [App\Controllers\Admin\MeetupController::class, 'store']);
$r->addRoute('PUT', '/api/admin/meetups/{id:\d+}', [App\Controllers\Admin\MeetupController::class, 'update']);
$r->addRoute('DELETE', '/api/admin/meetups/{id:\d+}', [App\Controllers\Admin\MeetupController::class, 'destroy']);

// Admin Hackathons
$r->addRoute('GET', '/api/admin/hackathons/upcoming', [App\Controllers\Admin\HackathonController::class, 'upcoming']);
$r->addRoute('PUT', '/api/admin/hackathons/upcoming', [App\Controllers\Admin\HackathonController::class, 'updateUpcoming']);
$r->addRoute('GET', '/api/admin/hackathons/past-winners', [App\Controllers\Admin\HackathonController::class, 'pastWinners']);
$r->addRoute('POST', '/api/admin/hackathons/past-winners', [App\Controllers\Admin\HackathonController::class, 'addWinner']);
$r->addRoute('DELETE', '/api/admin/hackathons/past-winners/{id:\d+}', [App\Controllers\Admin\HackathonController::class, 'deleteWinner']);

// Admin Build Projects
$r->addRoute('GET', '/api/admin/build-projects', [App\Controllers\Admin\BuildProjectController::class, 'index']);
$r->addRoute('POST', '/api/admin/build-projects', [App\Controllers\Admin\BuildProjectController::class, 'store']);
$r->addRoute('PUT', '/api/admin/build-projects/{id:\d+}', [App\Controllers\Admin\BuildProjectController::class, 'update']);
$r->addRoute('DELETE', '/api/admin/build-projects/{id:\d+}', [App\Controllers\Admin\BuildProjectController::class, 'destroy']);

// Admin Metrics
$r->addRoute('GET', '/api/admin/metrics', [App\Controllers\Admin\MetricController::class, 'index']);
$r->addRoute('PUT', '/api/admin/metrics/{id:\d+}', [App\Controllers\Admin\MetricController::class, 'update']);