<?php

namespace App\Repositories;

use App\Models\Community;
use Illuminate\Support\Facades\DB;

class CommunityRepository
{
    protected $community;

    public function __construct(Community $community)
    {
        $this->community = $community;
    }

    public function getAllCommunities()
    {
        return $this->community::all();
    }

    public function getCommunityById($id)
    {
        return $this->community::find($id);
    }

    public function createCommunity(array $data)
    {
        return $this->community::create($data);
    }

    public function updateCommunity($id, array $data)
    {
        $community = $this->community::find($id);
        if ($community) {
            $community->update($data);
            return $community;
        }
        return null;
    }

    public function deleteCommunity($id)
    {
        $community = $this->community::find($id);
        if ($community) {
            return $community->delete();
        }
        return false;
    }

    public function getCommunityMetrics($id)
    {
        // Example of fetching metrics, this can be customized as needed
        return DB::table('applications')
            ->select(DB::raw('count(*) as total_applications'))
            ->where('community_id', $id)
            ->first();
    }
}