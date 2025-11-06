<?php
require __DIR__ . '/../vendor/autoload.php';

use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load environment variables
$base = dirname(__DIR__);
if (file_exists($base . '/.env')) {
    (Dotenv\Dotenv::createImmutable($base))->load();
}

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string and decode URI
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

// Create dispatcher
$dispatcher = simpleDispatcher(function(RouteCollector $r) {
    require __DIR__ . '/../routes/fast_routes.php';
});

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        
        try {
            if (is_array($handler)) {
                [$class, $method] = $handler;
                $controller = new $class();
                
                // Check authentication for admin routes
                if (strpos($uri, '/api/admin') === 0 && !($class === 'App\\Controllers\\AuthController' && $method === 'login')) {
                    $user = (new App\Middleware\AuthMiddleware())->handle();
                    if (!$user) {
                        http_response_code(401);
                        echo json_encode(['error' => 'Unauthorized']);
                        exit;
                    }
                }
                
                $response = call_user_func_array([$controller, $method], $vars);
                if (is_array($response) || is_object($response)) {
                    echo json_encode($response);
                } elseif (is_string($response)) {
                    echo $response;
                }
            } elseif ($handler instanceof \Closure) {
                $res = call_user_func_array($handler, $vars);
                if (is_array($res) || is_object($res)) {
                    echo json_encode($res);
                } elseif (is_string($res)) {
                    echo $res;
                }
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
        break;
}


