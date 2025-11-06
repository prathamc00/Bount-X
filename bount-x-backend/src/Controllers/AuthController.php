<?php

namespace App\Controllers;

use App\Models\User;
use App\Services\NotificationService;
use Exception;

class AuthController
{
    protected $userModel;
    protected $notificationService;

    public function __construct()
    {
        $this->userModel = new User();
        $this->notificationService = new NotificationService();
    }

    public function register($request)
    {
        // Validate request data
        $data = $this->validateRegistration($request);

        // Create user
        try {
            $user = $this->userModel->create($data);
            // Send notification
            $this->notificationService->sendRegistrationConfirmation($user);
            return $this->response(201, 'User registered successfully', $user);
        } catch (Exception $e) {
            return $this->response(500, 'Registration failed: ' . $e->getMessage());
        }
    }

    public function login($request)
    {
        // Validate request data
        $data = $this->validateLogin($request);

        // Authenticate user
        try {
            $user = $this->userModel->authenticate($data['email'], $data['password']);
            if ($user) {
                // Generate JWT or session token
                $token = $this->generateToken($user);
                return $this->response(200, 'Login successful', ['token' => $token]);
            } else {
                return $this->response(401, 'Invalid credentials');
            }
        } catch (Exception $e) {
            return $this->response(500, 'Login failed: ' . $e->getMessage());
        }
    }

    protected function validateRegistration($request)
    {
        // Implement validation logic
        return $request; // Placeholder
    }

    protected function validateLogin($request)
    {
        // Implement validation logic
        return $request; // Placeholder
    }

    protected function generateToken($user)
    {
        // Implement token generation logic
        return 'generated_token'; // Placeholder
    }

    protected function response($status, $message, $data = null)
    {
        http_response_code($status);
        return json_encode(['message' => $message, 'data' => $data]);
    }
}