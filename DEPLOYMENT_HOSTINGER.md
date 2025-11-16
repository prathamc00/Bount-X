# BounT-X Deployment Guide for Hostinger

Complete guide to deploy the BounT-X Community Platform (React Frontend + PHP Backend) on Hostinger shared hosting.

## 📋 Prerequisites

Before starting, ensure you have:
- Active Hostinger hosting account (Business or higher recommended for Node.js support)
- Domain name configured in Hostinger
- FTP/SFTP credentials from Hostinger
- SSH access (if available on your plan)
- MySQL database access

## 🗂️ Hostinger Account Setup

### 1. Create MySQL Database

1. Log in to Hostinger hPanel
2. Navigate to **Databases** → **MySQL Databases**
3. Click **Create New Database**
4. Fill in details:
   - Database name: `u123456789_bountx` (Hostinger adds prefix automatically)
   - Username: `u123456789_admin`
   - Password: Generate a strong password
5. Note down these credentials for later use

### 2. Import Database Schema

1. In hPanel, go to **phpMyAdmin**
2. Select your newly created database
3. Click **Import** tab
4. Upload `bount-x-backend/database/schema.sql`
5. Click **Go** to execute

### 3. Update Admin Credentials (Important!)

After importing, update the default admin password:

```sql
-- In phpMyAdmin, run this query:
UPDATE users 
SET password = '$2y$10$YOUR_HASHED_PASSWORD' 
WHERE email = 'admin@bountx.com';
```

Or use the provided script after deployment.

## 🚀 Backend Deployment (PHP API)

### Step 1: Prepare Backend Files

On your local machine:

```bash
cd bount-x-backend

# Install production dependencies only
composer install --no-dev --optimize-autoloader

# Create production .env file
cp .env .env.production
```

### Step 2: Configure Production Environment

Edit `.env.production` with Hostinger details:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Hostinger Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_bountx
DB_USERNAME=u123456789_admin
DB_PASSWORD=your_database_password

# Generate a strong JWT secret
JWT_SECRET=your_very_long_random_secret_key_here

# Email Configuration (use Hostinger SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="BounT-X Community"

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
```

### Step 3: Upload Backend Files

**Option A: Using FTP/SFTP (FileZilla)**

1. Connect to Hostinger using FTP credentials
2. Navigate to `public_html/api/` (create if doesn't exist)
3. Upload these folders/files:
   ```
   app/
   config/
   database/
   routes/
   vendor/
   public/
   .env.production (rename to .env after upload)
   composer.json
   composer.lock
   ```
4. **Important**: Upload `public/` contents to `public_html/api/` root

**Option B: Using SSH (if available)**

```bash
# Connect to Hostinger
ssh u123456789@yourdomain.com

# Navigate to web root
cd public_html

# Create API directory
mkdir api
cd api

# Upload files using scp from local machine
scp -r bount-x-backend/* u123456789@yourdomain.com:~/public_html/api/
```

### Step 4: Configure Backend .htaccess

Create/update `public_html/api/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    
    # Redirect all requests to index.php
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php [QSA,L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# Disable directory browsing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.env">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### Step 5: Set File Permissions

Via SSH or FTP client:
```bash
chmod -R 755 public_html/api/
chmod 644 public_html/api/.env
```

### Step 6: Test Backend API

Visit: `https://yourdomain.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-11-16T10:30:00Z"
}
```

## 🎨 Frontend Deployment (React App)

### Step 1: Update API Configuration

Edit `bount-x-frontend/services/api.ts`:

```typescript
// Change from localhost to your production API
const API_BASE_URL = 'https://yourdomain.com/api';
```

### Step 2: Build Production Frontend

```bash
cd bount-x-frontend

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with optimized static files.

### Step 3: Upload Frontend Files

**Using FTP/SFTP:**

1. Connect to Hostinger
2. Navigate to `public_html/`
3. Upload ALL contents from `dist/` folder:
   ```
   index.html
   assets/
   vite.svg (if exists)
   ```
4. **Important**: Upload files directly to `public_html/`, not in a subfolder

**Using SSH:**

```bash
# From local machine
cd bount-x-frontend
scp -r dist/* u123456789@yourdomain.com:~/public_html/
```

### Step 4: Configure Frontend .htaccess

Create/update `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Don't rewrite API calls
    RewriteCond %{REQUEST_URI} !^/api/
    
    # Rewrite everything else to index.html for React Router
    RewriteRule ^ index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🔐 Security Configuration

### 1. Secure .env File

Ensure `.env` is not accessible:

```apache
# Add to .htaccess
<FilesMatch "^\.env">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### 2. Generate Strong JWT Secret

```bash
# Generate random secret (run locally)
openssl rand -base64 64
```

Update in `.env`:
```env
JWT_SECRET=your_generated_secret_here
```

### 3. Enable HTTPS

In Hostinger hPanel:
1. Go to **SSL** section
2. Enable **Free SSL Certificate**
3. Wait for activation (5-15 minutes)
4. Force HTTPS redirect

Add to `public_html/.htaccess`:
```apache
# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 4. Update Admin Password

After deployment, change default admin credentials:

```bash
# Via SSH
cd public_html/api
php update-admin-password.php
```

Or run SQL query in phpMyAdmin.

## 📂 Final Directory Structure

Your Hostinger `public_html/` should look like:

```
public_html/
├── api/                          # Backend API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── vendor/
│   ├── .env
│   ├── .htaccess
│   └── index.php
├── assets/                       # Frontend assets (from dist)
│   ├── index-[hash].js
│   └── index-[hash].css
├── .htaccess                     # Frontend routing
└── index.html                    # React app entry
```

## ✅ Post-Deployment Checklist

- [ ] Database imported successfully
- [ ] Backend API health check returns "ok"
- [ ] Frontend loads at `https://yourdomain.com`
- [ ] Admin login works at `https://yourdomain.com/#admin`
- [ ] Application submission works
- [ ] HTTPS is enabled and forced
- [ ] Admin password changed from default
- [ ] `.env` file is protected
- [ ] Email configuration tested (if using)

## 🧪 Testing Deployment

### Test Backend API

```bash
# Health check
curl https://yourdomain.com/api/health

# Test admin login
curl -X POST https://yourdomain.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bountx.com","password":"your_new_password"}'

# Test public endpoint
curl https://yourdomain.com/api/meetups
```

### Test Frontend

1. Visit `https://yourdomain.com`
2. Try submitting an application
3. Navigate to `https://yourdomain.com/#admin`
4. Login with admin credentials
5. Check all admin dashboard features

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error

**Solution:**
- Check `.htaccess` syntax
- Verify file permissions (755 for directories, 644 for files)
- Check PHP error logs in hPanel
- Ensure all dependencies are uploaded

### Issue: Database Connection Failed

**Solution:**
- Verify database credentials in `.env`
- Check database name includes Hostinger prefix
- Ensure database user has all privileges
- Test connection via phpMyAdmin

### Issue: CORS Errors

**Solution:**
- Verify CORS headers in `api/.htaccess`
- Check API_BASE_URL in frontend matches your domain
- Clear browser cache

### Issue: 404 on API Routes

**Solution:**
- Check `.htaccess` rewrite rules
- Verify `mod_rewrite` is enabled (contact Hostinger support)
- Ensure `index.php` is in correct location

### Issue: Frontend Shows Blank Page

**Solution:**
- Check browser console for errors
- Verify all assets uploaded from `dist/` folder
- Check API_BASE_URL is correct
- Clear browser cache and hard refresh

### Issue: Admin Login Fails

**Solution:**
- Verify JWT_SECRET is set in `.env`
- Check admin credentials in database
- Test API endpoint directly with curl
- Check browser console for errors

## 🔄 Updating Your Deployment

### Update Backend

```bash
# Local machine
cd bount-x-backend
git pull  # or make your changes
composer install --no-dev

# Upload changed files via FTP/SSH
# No need to re-upload vendor/ if dependencies unchanged
```

### Update Frontend

```bash
# Local machine
cd bount-x-frontend
npm run build

# Upload new dist/ contents to public_html/
# Overwrite existing files
```

## 📞 Support Resources

- **Hostinger Support**: https://www.hostinger.com/support
- **Hostinger Knowledge Base**: https://support.hostinger.com
- **PHP Documentation**: https://www.php.net/docs.php
- **React Deployment**: https://vitejs.dev/guide/static-deploy.html

## 🎉 Success!

Your BounT-X Community Platform should now be live at:
- **Frontend**: https://yourdomain.com
- **Admin Dashboard**: https://yourdomain.com/#admin
- **API**: https://yourdomain.com/api

---

**Note**: Replace `yourdomain.com` with your actual domain throughout this guide.
