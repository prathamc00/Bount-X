<?php

namespace App\Controllers;

use App\Models\Meetup;

class MeetupController
{
    public function index()
    {
        try {
            $meetups = Meetup::all();
            
            // Transform data for frontend
            $formattedMeetups = array_map(function($meetup) {
                return [
                    'id' => $meetup['id'],
                    'title' => $meetup['title'],
                    'date' => $meetup['starts_at'],
                    'location' => $meetup['venue'],
                    'topic' => $meetup['topic'] ?? '',
                    'rsvpUrl' => $meetup['rsvp_url'] ?? '',
                    'tags' => json_decode($meetup['tags'] ?? '[]', true)
                ];
            }, $meetups);
            
            return $formattedMeetups;
        } catch (Exception $e) {
            http_response_code(500);
            return ['error' => 'Failed to fetch meetups'];
        }
    }
}