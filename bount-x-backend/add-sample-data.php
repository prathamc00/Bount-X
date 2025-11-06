<?php
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    (Dotenv\Dotenv::createImmutable(__DIR__))->load();
}

echo "=== Adding Sample Data ===\n\n";

try {
    $config = require __DIR__ . '/config/database.php';
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    // Add sample upcoming hackathon
    echo "Adding sample upcoming hackathon...\n";
    $stmt = $pdo->prepare("
        INSERT INTO hackathons (title, theme, start_date, end_date, registration_url, prizes, is_upcoming) 
        VALUES (?, ?, ?, ?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE 
        title = VALUES(title), theme = VALUES(theme), start_date = VALUES(start_date), 
        end_date = VALUES(end_date), registration_url = VALUES(registration_url), prizes = VALUES(prizes)
    ");
    
    $stmt->execute([
        'BounT-X Winter Hackathon 2025',
        'AI & Blockchain Innovation',
        '2025-12-15',
        '2025-12-17',
        'https://bountx.com/hackathon-register',
        json_encode(['$5000 Grand Prize', '$2500 Second Place', '$1000 Third Place', '$500 Best Innovation'])
    ]);
    
    $hackathonId = $pdo->lastInsertId();
    echo "✓ Added upcoming hackathon (ID: $hackathonId)\n";
    
    // Add sample past winners
    echo "Adding sample past winners...\n";
    $winners = [
        [
            'name' => 'CryptoTracker Pro',
            'team' => json_encode(['Alice Johnson', 'Bob Smith', 'Carol Davis']),
            'description' => 'A comprehensive cryptocurrency portfolio tracking application with real-time analytics and AI-powered investment insights.',
            'github_url' => 'https://github.com/team1/cryptotracker-pro',
            'prize' => 'First Place - $5000',
            'year' => 2024
        ],
        [
            'name' => 'EcoChain',
            'team' => json_encode(['David Wilson', 'Emma Brown']),
            'description' => 'Blockchain-based carbon credit trading platform that helps companies offset their environmental impact.',
            'github_url' => 'https://github.com/team2/ecochain',
            'prize' => 'Second Place - $2500',
            'year' => 2024
        ],
        [
            'name' => 'SmartVote',
            'team' => json_encode(['Frank Miller', 'Grace Lee', 'Henry Taylor', 'Ivy Chen']),
            'description' => 'Decentralized voting system using blockchain technology to ensure transparent and secure elections.',
            'github_url' => 'https://github.com/team3/smartvote',
            'prize' => 'Best Innovation - $1000',
            'year' => 2023
        ]
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO hackathon_projects (hackathon_id, name, team, description, github_url, prize, year) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    foreach ($winners as $winner) {
        $stmt->execute([
            null, // hackathon_id can be null for past winners
            $winner['name'],
            $winner['team'],
            $winner['description'],
            $winner['github_url'],
            $winner['prize'],
            $winner['year']
        ]);
        echo "✓ Added winner: {$winner['name']}\n";
    }
    
    // Add sample meetups
    echo "Adding sample meetups...\n";
    $meetups = [
        [
            'title' => 'React & TypeScript Best Practices',
            'description' => 'Learn advanced patterns and techniques for building scalable React applications with TypeScript.',
            'starts_at' => '2025-11-20 18:00:00',
            'venue' => 'BounT-X Community Center',
            'topic' => 'Frontend Development',
            'rsvp_url' => 'https://bountx.com/meetup-react-ts',
            'tags' => json_encode(['React', 'TypeScript', 'Frontend', 'JavaScript'])
        ],
        [
            'title' => 'Blockchain Development Workshop',
            'description' => 'Hands-on workshop covering smart contract development and DeFi protocols.',
            'starts_at' => '2025-11-25 19:00:00',
            'venue' => 'Tech Hub Downtown',
            'topic' => 'Blockchain',
            'rsvp_url' => 'https://bountx.com/meetup-blockchain',
            'tags' => json_encode(['Blockchain', 'Solidity', 'DeFi', 'Web3'])
        ],
        [
            'title' => 'AI/ML in Production',
            'description' => 'Deploying machine learning models at scale with modern MLOps practices.',
            'starts_at' => '2025-12-05 18:30:00',
            'venue' => 'Innovation Lab',
            'topic' => 'Machine Learning',
            'rsvp_url' => 'https://bountx.com/meetup-aiml',
            'tags' => json_encode(['AI', 'Machine Learning', 'MLOps', 'Python'])
        ]
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO meetups (title, description, starts_at, venue, topic, rsvp_url, tags) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    foreach ($meetups as $meetup) {
        $stmt->execute([
            $meetup['title'],
            $meetup['description'],
            $meetup['starts_at'],
            $meetup['venue'],
            $meetup['topic'],
            $meetup['rsvp_url'],
            $meetup['tags']
        ]);
        echo "✓ Added meetup: {$meetup['title']}\n";
    }
    
    // Add sample build projects
    echo "Adding sample build projects...\n";
    $projects = [
        [
            'title' => 'Community Dashboard',
            'creator' => 'BounT-X Core Team',
            'description' => 'A comprehensive dashboard for managing community activities, events, and member interactions.',
            'status' => 'Launched',
            'image' => 'https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Dashboard',
            'repo_url' => 'https://github.com/bountx/community-dashboard',
            'tech_stack' => json_encode(['React', 'TypeScript', 'Node.js', 'PostgreSQL'])
        ],
        [
            'title' => 'Skill Matching Platform',
            'creator' => 'Alice Johnson',
            'description' => 'AI-powered platform that matches community members based on complementary skills for project collaboration.',
            'status' => 'In Progress',
            'image' => 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=Skills',
            'repo_url' => 'https://github.com/alice/skill-matcher',
            'tech_stack' => json_encode(['Python', 'FastAPI', 'React', 'TensorFlow'])
        ],
        [
            'title' => 'Decentralized Learning Hub',
            'creator' => 'David Wilson',
            'description' => 'Blockchain-based platform for peer-to-peer learning and skill verification within the community.',
            'status' => 'Funded',
            'image' => 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Learning',
            'repo_url' => 'https://github.com/david/decentral-learn',
            'tech_stack' => json_encode(['Solidity', 'Web3.js', 'IPFS', 'React'])
        ]
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO build_projects (title, creator, description, status, image, repo_url, tech_stack) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    foreach ($projects as $project) {
        $stmt->execute([
            $project['title'],
            $project['creator'],
            $project['description'],
            $project['status'],
            $project['image'],
            $project['repo_url'],
            $project['tech_stack']
        ]);
        echo "✓ Added project: {$project['title']}\n";
    }
    
    // Update metrics
    echo "Updating metrics...\n";
    $stmt = $pdo->prepare("UPDATE metrics SET value = ? WHERE key_name = ?");
    $stmt->execute([3, 'upcomingEvents']); // 3 meetups
    $stmt->execute([3, 'activeProjects']); // 3 projects
    echo "✓ Updated metrics\n";
    
    echo "\n=== Sample Data Added Successfully! ===\n";
    echo "You can now see:\n";
    echo "- 1 upcoming hackathon\n";
    echo "- 3 past hackathon winners\n";
    echo "- 3 upcoming meetups\n";
    echo "- 3 build projects\n";
    echo "- Updated KPI metrics\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}