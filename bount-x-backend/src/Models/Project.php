<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'title',
        'description',
        'community_id',
        'status',
        'created_at',
        'updated_at',
    ];

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}