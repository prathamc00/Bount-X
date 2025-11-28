# BounT-X Community Platform

A full-stack web application for managing community memberships, meetups, hackathons, and build projects. Built with React TypeScript frontend and PHP REST API backend.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd BounT-X

# Start backend (Terminal 1)
cd bount-x-backend
composer install
cp .env.example .env
# Configure .env with your database credentials
php -S localhost:8000 -t public/

# Start frontend (Terminal 2)
cd bount-x-frontend
npm install
npm run dev
```

Visit `http://localhost:3000` for the app and `http://localhost:3000/#admin` for admin dashboard.

## 📋 Features

### Public Features
- Community application submission
- Browse upcoming meetups and events
- View hackathon information and past winners
- Explore community build projects

### Admin Dashboard
- Review and manage membership applications
- Create and manage meetups
- Manage hackathon events and winners
- Track build projects and progress
- View analytics and KPIs
- Secure JWT-based authentication

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0 with TypeScript
- Vite 6.2.0 for fast development
- Modern CSS with responsive design

**Backend:**
- PHP 7.4+ with RESTful API architecture
- FastRoute for routing
- Firebase JWT for authentication
- MySQL database with PDO
- Composer for dependency management

## 📁 Project Structure

```
BounT-X/
├── bount-x-frontend/          # React TypeScript frontend
│   ├── components/            # React components
│   ├── services/              # API service layer
│   └── package.json
├── bount-x-backend/           # PHP REST API backend
│   ├── app/                   # Controllers and middleware
│   ├── routes/                # API route definitions
│   ├── database/              # Schema and migrations
│   └── composer.json
├── DEPLOYMENT_HOSTINGER.md    # Deployment guide
└── README.md                  # This file
```

## 🔧 Prerequisites

- Node.js 16+ and npm
- PHP 7.4+ 
- MySQL 5.7+
- Composer

## 📖 Documentation

- [Frontend Documentation](./bount-x-frontend/README.md) - React app setup and development
- [Backend Documentation](./bount-x-backend/README.md) - PHP API setup and endpoints
- [Deployment Guide](./DEPLOYMENT_HOSTINGER.md) - Complete Hostinger deployment instructions

## 🚀 Development Setup

### Backend Setup

```bash
cd bount-x-backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Import database schema
mysql -u root -p < database/schema.sql

# Start development server
php -S localhost:8000 -t public/
```

Default admin credentials: `admin@bountx.com` / `admin123`

### Frontend Setup

```bash
cd bount-x-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/health` - System health check
- `POST /api/applications` - Submit community application
- `GET /api/meetups` - List all meetups
- `GET /api/hackathons/upcoming` - Get upcoming hackathon
- `GET /api/build-projects` - List build projects

### Admin Endpoints (JWT Required)
- `POST /api/admin/auth/login` - Admin authentication
- `GET /api/admin/stats/kpis` - Dashboard metrics
- `GET /api/admin/applications` - Manage applications
- `PUT /api/admin/applications/{id}` - Update application status
- Full CRUD for meetups, hackathons, and build projects

## 🔐 Security

- JWT-based authentication for admin routes
- Password hashing with bcrypt
- CORS configuration for cross-origin requests
- Environment-based configuration
- Input validation and sanitization

## 🚀 Deployment

See [DEPLOYMENT_HOSTINGER.md](./DEPLOYMENT_HOSTINGER.md) for complete deployment instructions to Hostinger shared hosting.

Quick deployment checklist:
1. Set up MySQL database
2. Upload backend to `public_html/api/`
3. Build and upload frontend to `public_html/`
4. Configure `.htaccess` files
5. Enable SSL certificate
6. Update admin credentials

## 🧪 Testing

### Backend Testing
```bash
cd bount-x-backend

# Run PHPUnit tests
./vendor/bin/phpunit

# Manual testing scripts
php test-connection.php
php test-auth-flow.php
php test-full-api.php
```

### Frontend Testing
```bash
cd bount-x-frontend
npm run dev
# Test in browser at http://localhost:3000
```

## 📊 Database Schema

Main tables:
- `users` - Admin users with authentication
- `applications` - Community membership applications
- `meetups` - Community meetup events
- `hackathons` - Hackathon events
- `hackathon_projects` - Past hackathon winners
- `build_projects` - Community build projects
- `metrics` - KPI tracking and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the BounT-X Community Platform.

## 🆘 Support

For issues and questions:
- Check the [Frontend README](./bount-x-frontend/README.md) for frontend issues
- Check the [Backend README](./bount-x-backend/README.md) for API issues
- Review the [Deployment Guide](./DEPLOYMENT_HOSTINGER.md) for hosting issues

---

Built with ❤️ for the BounT-X Community
