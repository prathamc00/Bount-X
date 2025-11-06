<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

require_once __DIR__ . '/../bootstrap.php';

$app = AppFactory::create();

// Health Check Route
$app->get('/api/health', function (ServerRequestInterface $request, ResponseInterface $response) {
    $response->getBody()->write(json_encode(['status' => 'ok']));
    return $response->withHeader('Content-Type', 'application/json');
});

// Authentication Routes
$app->post('/api/auth/login', 'AuthController@login');
$app->post('/api/auth/register', 'AuthController@register');

// Community Routes
$app->get('/api/communities', 'CommunityController@index');
$app->get('/api/communities/{id}', 'CommunityController@show');

// Application Routes
$app->get('/api/applications', 'ApplicationController@index');
$app->post('/api/applications', 'ApplicationController@store');
$app->get('/api/applications/{id}', 'ApplicationController@show');
$app->put('/api/applications/{id}', 'ApplicationController@update');
$app->delete('/api/applications/{id}', 'ApplicationController@destroy');

// Project Routes
$app->get('/api/projects', 'ProjectController@index');
$app->post('/api/projects', 'ProjectController@store');
$app->get('/api/projects/{id}', 'ProjectController@show');
$app->put('/api/projects/{id}', 'ProjectController@update');
$app->delete('/api/projects/{id}', 'ProjectController@destroy');

// Run the application
$app->run();