<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function communities()
    {
        return $this->hasMany(Community::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}