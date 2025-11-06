<?php

namespace App\Controllers;

use App\Services\ResponseService;

class HealthController
{
    public function check()
    {
        return ResponseService::json(['status' => 'ok'], 200);
    }
}