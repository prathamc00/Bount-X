<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    protected $table = 'communities';

    protected $fillable = [
        'name',
        'description',
        'created_at',
        'updated_at',
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public static function getAllCommunities()
    {
        return self::all();
    }

    public static function findCommunityById($id)
    {
        return self::find($id);
    }

    public function saveCommunity(array $data)
    {
        return $this->create($data);
    }

    public function updateCommunity(array $data)
    {
        return $this->update($data);
    }

    public function deleteCommunity()
    {
        return $this->delete();
    }
}