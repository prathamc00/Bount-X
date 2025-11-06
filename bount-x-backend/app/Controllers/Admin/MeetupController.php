<?php

namespace App\Controllers\Admin;

use App\Models\Meetup;

class MeetupController
{
    public function index()
    {
        try {
            $meetups = Meetup::all();
            
            $formattedMeetups = array_map(function($meetup) {
                return [
                    'id' => $meetup['id'],
                    'title' => $meetup['title'],
                    'description' => $meetup['description'],
                    'starts_at' => $meetup['starts_at'],
                    'venue' => $meetup['venue'],
                    'topic' => $meetup['topic'],
                    'rsvp_url' => $meetup['rsvp_url'],
                    'tags' => json_decode($meetup['tags'] ?? '[]', true)
                ];
            }, $meetups);
            
            return $formattedMeetups;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch meetups'];
        }
    }

    public function store()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $required = ['title', 'starts_at'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    return ['error' => "Field '$field' is required"];
                }
            }
            
            $meetupData = [
                'title' => $data['title'],
                'description' => $data['description'] ?? '',
                'starts_at' => $data['starts_at'],
                'venue' => $data['venue'] ?? ''
            ];
            
            $id = Meetup::create($meetupData);
            
            http_response_code(201);
            return ['success' => true, 'id' => $id, 'message' => 'Meetup created successfully'];
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to create meetup'];
        }
    }

    public function update($id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $meetupData = [
                'title' => $data['title'] ?? '',
                'description' => $data['description'] ?? '',
                'starts_at' => $data['starts_at'] ?? '',
                'venue' => $data['venue'] ?? ''
            ];
            
            $success = Meetup::update($id, $meetupData);
            
            if ($success) {
                return ['success' => true, 'message' => 'Meetup updated successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Meetup not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to update meetup'];
        }
    }

    public function destroy($id)
    {
        try {
            $success = Meetup::delete($id);
            
            if ($success) {
                return ['success' => true, 'message' => 'Meetup deleted successfully'];
            } else {
                http_response_code(404);
                return ['error' => 'Meetup not found'];
            }
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to delete meetup'];
        }
    }
}