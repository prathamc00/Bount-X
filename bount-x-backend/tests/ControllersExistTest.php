<?php

use PHPUnit\Framework\TestCase;

final class ControllersExistTest extends TestCase
{
    public function testAuthControllerExists()
    {
        $this->assertTrue(class_exists(\App\Controllers\AuthController::class));
        $this->assertTrue(method_exists(\App\Controllers\AuthController::class, 'login'));
    }

    public function testAdminControllersExist()
    {
        $this->assertTrue(class_exists(\App\Controllers\Admin\ApplicationController::class));
        $this->assertTrue(class_exists(\App\Controllers\Admin\MeetupController::class));
        $this->assertTrue(class_exists(\App\Controllers\Admin\HackathonController::class));
        $this->assertTrue(class_exists(\App\Controllers\Admin\BuildProjectController::class));
        $this->assertTrue(class_exists(\App\Controllers\Admin\MetricController::class));
        $this->assertTrue(class_exists(\App\Controllers\Admin\StatsController::class));
    }
}