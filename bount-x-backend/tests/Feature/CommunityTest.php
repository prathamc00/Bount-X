<?php

namespace Tests\Feature;

use Tests\TestCase;

class CommunityTest extends TestCase
{
    public function test_can_fetch_communities()
    {
        $response = $this->get('/api/communities');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'description', 'created_at', 'updated_at'],
        ]);
    }

    public function test_can_fetch_single_community()
    {
        $communityId = 1; // Assuming a community with ID 1 exists
        $response = $this->get("/api/communities/{$communityId}");

        $response->assertStatus(200);
        $response->assertJsonStructure(['id', 'name', 'description', 'created_at', 'updated_at']);
    }

    public function test_can_create_community()
    {
        $data = [
            'name' => 'New Community',
            'description' => 'Description of the new community',
        ];

        $response = $this->post('/api/communities', $data);

        $response->assertStatus(201);
        $response->assertJsonFragment($data);
    }

    public function test_can_update_community()
    {
        $communityId = 1; // Assuming a community with ID 1 exists
        $data = [
            'name' => 'Updated Community Name',
            'description' => 'Updated description',
        ];

        $response = $this->put("/api/communities/{$communityId}", $data);

        $response->assertStatus(200);
        $response->assertJsonFragment($data);
    }

    public function test_can_delete_community()
    {
        $communityId = 1; // Assuming a community with ID 1 exists
        $response = $this->delete("/api/communities/{$communityId}");

        $response->assertStatus(204);
    }
}