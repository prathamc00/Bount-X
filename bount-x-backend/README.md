# BounT-X PHP Backend

A robust PHP REST API backend for the BounT-X Community Platform, providing comprehensive community management features with secure admin authentication and public endpoints.

## 🚀 Features

### Public API
- **Health Check**: System status and database connectivity
- **Community Applications**: Accept and process membership applications
- **Meetup Listings**: Serve meetup information and schedules
- **Hackathon Data**: Provide upcoming hackathons and past winners
- **Build Projects**: Showcase community member projects

### Admin API
- **Secure Authentication**: JWT-based admin login system
- **Application Management**: Review, approve, and reject applications
- **Content Management**: CRUD operations for meetups, hackathons, and projects
- **Analytics Dashboard**: KPI tracking and metrics
- **User Management**: Admin user administration

### Technical Features
- **RESTful API**: Clean, consistent API design
- **JWT Authentication**: Secure token-based authentication
- **Database Abstraction**: PDO-based database layer
- **CORS Support**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error responses
- **Input Validation**: Request validation and sanitization

## 🛠️ Tech Stack

- **Language**: PHP 7.4+
- **Routing**: FastRoute for efficient URL routing
- **Authentication**: Firebase JWT for token management
- **Database**: MySQL with PDO
- **Environment**: PHP-DotEnv for configuration
- **Testing**: PHPUnit for unit testing
- **Architecture**: PSR-4 autoloading with MVC pattern

## 📋 Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Composer (PHP dependency manager)
- Web server (Apache/Nginx) or PHP built-in server

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BounT-X/bount-x-php-backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=BoUNTxqa
   DB_USERNAME=root
   DB_PASSWORD=1234
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database setup**
   ```bash
   # Create database and tables
   mysql -u root -p < database/schema.sql
   
   # Or run the schema manually in your MySQL client
   ```

5. **Set permissions** (if using Apache/Nginx)
   ```bash
   chmod -R 755 public/
   chmod -R 777 storage/ # if you have a storage directory
   ```

## 🚀 Development

### Start Development Server
```bash
# Using PHP built-in server
php -S localhost:8000 -t public/

# Or with specific host binding
php -S 0.0.0.0:8000 -t public/
```

The API will be available at `http://localhost:8000`



## 📁 Project Structure

```
bount-x-php-backend/
├── app/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   ├── ApplicationController.php    # Admin application management
│   │   │   ├── BuildProjectController.php   # Admin project management
│   │   │   ├── HackathonController.php      # Admin hackathon management
│   │   │   ├── MeetupController.php         # Admin meetup management
│   │   │   └── StatsController.php          # Admin analytics
│   │   ├── ApplicationController.php        # Public application submission
│   │   ├── AuthController.php               # Authentication
│   │   ├── HackathonController.php          # Public hackathon data
│   │   └── HealthController.php             # System health check
│   ├── Middleware/
│   │   └── AuthMiddleware.php               # JWT authentication middleware
│   └── Models/                              # Database models (if implemented)
├── database/
│   ├── migrations/                          # Database migration files
│   └── schema.sql                           # Complete database schema
├── docs/
│   └── openapi.yaml                         # API documentation
├── public/
│   └── index.php                            # Application entry point
├── routes/
│   └── fast_routes.php                      # API route definitions
├── tests/                                   # PHPUnit test files
├── .env.example                             # Environment template
├── composer.json                            # PHP dependencies
└── README.md                                # This file
```

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

### Core Tables
- **users**: Admin users with role-based access
- **applications**: Community membership applications
- **meetups**: Community meetup events
- **hackathons**: Hackathon events and information
- **hackathon_projects**: Past hackathon winners and projects
- **build_projects**: Community member build projects
- **metrics**: KPI tracking and analytics data

### Default Data
- Admin user: `admin@bountx.com` / `admin123`
- Sample metrics and KPI tracking setup

## 🔌 API Endpoints

### Public Endpoints
```
GET    /api/health                    # System health check
POST   /api/applications              # Submit community application
GET    /api/meetups                   # List all meetups
GET    /api/hackathons/upcoming       # Get upcoming hackathon
GET    /api/hackathons/past-winners   # Get past hackathon winners
GET    /api/build-projects            # List all build projects
```

### Admin Endpoints (Require JWT Authentication)
```
POST   /api/admin/auth/login          # Admin login
GET    /api/admin/stats/kpis          # Dashboard KPIs
GET    /api/admin/applications        # List applications (with filters)
PUT    /api/admin/applications/{id}   # Update application status
GET    /api/admin/meetups             # Admin meetup management
POST   /api/admin/meetups             # Create new meetup
PUT    /api/admin/meetups/{id}        # Update meetup
DELETE /api/admin/meetups/{id}        # Delete meetup
# ... similar patterns for hackathons and build projects
```

## 🔐 Authentication

### JWT Implementation
- **Login**: `POST /api/admin/auth/login`
- **Token Format**: Bearer token in Authorization header
- **Expiration**: Configurable token lifetime
- **Middleware**: Automatic token validation for protected routes

### Usage Example
```bash
# Login
curl -X POST http://localhost:8000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bountx.com","password":"admin123"}'

# Use token
curl -X GET http://localhost:8000/api/admin/stats/kpis \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
./vendor/bin/phpunit

# Run specific test file
./vendor/bin/phpunit tests/AuthTest.php

# Run with coverage
./vendor/bin/phpunit --coverage-html coverage/
```

### Manual Testing Scripts
```bash
# Test database connection
php test-connection.php

# Test authentication flow
php test-auth-flow.php

# Test full API functionality
php test-full-api.php

# Check applications
php check-applications.php

# Add sample data
php add-sample-data.php
```

## 🔧 Configuration

### Environment Variables
```env
# Application
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=BoUNTxqa
DB_USERNAME=root
DB_PASSWORD=1234

# Security
JWT_SECRET=your_jwt_secret_key

# Email (if implemented)
MAIL_MAILER=smtp
MAIL_HOST=your_mail_host
MAIL_PORT=587
```

### CORS Configuration
The API includes CORS headers for cross-origin requests:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## 🚀 Deployment

### Production Setup
1. **Web Server Configuration**
   ```apache
   # Apache .htaccess (in public/)
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.php [QSA,L]
   ```

2. **Environment**
   ```bash
   # Set production environment
   APP_ENV=production
   APP_DEBUG=false
   ```

3. **Database**
   ```bash
   # Run migrations in production
   mysql -u username -p database_name < database/schema.sql
   ```

### Security Considerations
- Change default admin credentials
- Use strong JWT secret
- Enable HTTPS in production
- Implement rate limiting
- Regular security updates

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:8000/api/health
```

Response includes:
- Service status
- Database connectivity
- Timestamp
- Version information

### Logging
- Error logging to PHP error log
- Custom logging can be implemented
- Database query logging available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Code Standards
- Follow PSR-4 autoloading
- Use meaningful variable names
- Add PHPDoc comments
- Validate all inputs
- Handle errors gracefully


### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check credentials in .env
   # Verify MySQL is running
   # Test with: php test-connection.php
   ```

2. **JWT Token Issues**
   ```bash
   # Verify JWT_SECRET in .env
   # Check token format in requests
   # Test with: php test-auth-flow.php
   ```

3. **CORS Errors**
   ```bash
   # Check CORS headers in responses
   # Verify frontend URL configuration
   ```

4. **Permission Denied**
   ```bash
   # Check file permissions
   chmod -R 755 public/
   ```

## 📄 License

This project is part of the BounT-X Community Platform.

---

**Note**: This backend API is designed to work with the BounT-X Ensure both applications are properly configured and running for full functionality.