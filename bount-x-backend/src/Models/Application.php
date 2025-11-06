<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'applications';

    protected $fillable = [
        'user_id',
        'community_id',
        'status',
        'submitted_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public static function createApplication(array $data)
    {
        return self::create($data);
    }

    public static function getApplicationById($id)
    {
        return self::find($id);
    }

    public static function updateApplication($id, array $data)
    {
        $application = self::find($id);
        if ($application) {
            $application->update($data);
            return $application;
        }
        return null;
    }

    public static function deleteApplication($id)
    {
        $application = self::find($id);
        if ($application) {
            return $application->delete();
        }
        return false;
    }

    public static function getAllApplications()
    {
        return self::all();
    }
}