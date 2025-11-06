<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApplicationTest extends TestCase
{
    public function test_application_creation()
    {
        $response = $this->postJson('/api/applications', [
            'user_id' => 1,
            'community_id' => 1,
            'status' => 'pending',
            'data' => [
                'field1' => 'value1',
                'field2' => 'value2',
            ],
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('applications', [
            'user_id' => 1,
            'community_id' => 1,
            'status' => 'pending',
        ]);
    }

    public function test_application_retrieval()
    {
        $response = $this->getJson('/api/applications/1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'user_id',
            'community_id',
            'status',
            'data',
        ]);
    }

    public function test_application_update()
    {
        $response = $this->putJson('/api/applications/1', [
            'status' => 'approved',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('applications', [
            'id' => 1,
            'status' => 'approved',
        ]);
    }

    public function test_application_deletion()
    {
        $response = $this->deleteJson('/api/applications/1');

        $response->assertStatus(204);
        $this->assertDatabaseMissing('applications', [
            'id' => 1,
        ]);
    }
}