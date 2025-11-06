<?php

namespace App\Controllers;

use App\Repositories\CommunityRepository;
use App\Models\Community;

class CommunityController
{
    protected $communityRepository;

    public function __construct()
    {
        $this->communityRepository = new CommunityRepository();
    }

    public function getAllCommunities()
    {
        return $this->communityRepository->getAll();
    }

    public function getCommunityById($id)
    {
        return $this->communityRepository->findById($id);
    }

    public function createCommunity(array $data)
    {
        $community = new Community($data);
        return $this->communityRepository->create($community);
    }

    public function updateCommunity($id, array $data)
    {
        $community = $this->communityRepository->findById($id);
        if ($community) {
            $community->update($data);
            return $this->communityRepository->update($community);
        }
        return null;
    }

    public function deleteCommunity($id)
    {
        return $this->communityRepository->delete($id);
    }

    public function getCommunityMetrics($id)
    {
        return $this->communityRepository->getMetrics($id);
    }
}