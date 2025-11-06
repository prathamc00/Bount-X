-- BounT-X Database Schema
-- Run this SQL to create the required tables

CREATE DATABASE IF NOT EXISTS BoUNTxqa;
USE BoUNTxqa;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'member') DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    skill ENUM('Hacker', 'Designer', 'Developer') NOT NULL,
    experience ENUM('Junior', 'Mid-Level', 'Senior') NOT NULL,
    portfolio_url TEXT,
    reason TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meetups table
CREATE TABLE IF NOT EXISTS meetups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    starts_at DATETIME NOT NULL,
    venue VARCHAR(255),
    topic VARCHAR(255),
    rsvp_url TEXT,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hackathons table
CREATE TABLE IF NOT EXISTS hackathons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    start_date DATE,
    end_date DATE,
    registration_url TEXT,
    prizes JSON,
    is_upcoming BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hackathon winners/past projects table
CREATE TABLE IF NOT EXISTS hackathon_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hackathon_id INT,
    name VARCHAR(255) NOT NULL,
    team JSON,
    description TEXT,
    github_url TEXT,
    prize VARCHAR(255),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons(id) ON DELETE SET NULL
);

-- Build projects table
CREATE TABLE IF NOT EXISTS build_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creator VARCHAR(255),
    description TEXT,
    status ENUM('In Progress', 'Launched', 'Funded') DEFAULT 'In Progress',
    image VARCHAR(255),
    repo_url TEXT,
    tech_stack JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Metrics table for KPIs
CREATE TABLE IF NOT EXISTS metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value INT DEFAULT 0,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password_hash, role) VALUES 
('Admin User', 'admin@bountx.com', '$2y$10$gphCScwadOHNUFIx6fWboeGqTINU5IPSx13ogsVtBfRUdvdJArstC', 'admin');

-- Insert default metrics
INSERT IGNORE INTO metrics (key_name, value, description) VALUES 
('newMembers', 0, 'New members in the last 30 days'),
('applicationsPending', 0, 'Number of pending applications'),
('upcomingEvents', 0, 'Number of upcoming events'),
('activeProjects', 0, 'Number of active projects');