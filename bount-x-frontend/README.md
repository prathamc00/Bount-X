# BounT-X Frontend

A modern React TypeScript application for the BounT-X Community Platform, providing both public community features and admin dashboard functionality.

## 🚀 Features

### Public Features
- **Community Applications**: Submit applications to join the BounT-X community
- **Meetup Listings**: Browse upcoming and past community meetups
- **Hackathon Information**: View upcoming hackathons and past winners
- **Build Projects**: Explore community member projects and their progress
- **Responsive Design**: Optimized for desktop and mobile devices

### Admin Dashboard
- **Application Management**: Review, approve, or reject community applications
- **Meetup Management**: Create, edit, and manage community meetups
- **Hackathon Management**: Manage hackathon events and track winners
- **Build Project Management**: Oversee community build projects
- **Analytics Dashboard**: View key performance indicators and metrics
- **Secure Authentication**: JWT-based admin authentication

## 🛠️ Tech Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: CSS Modules with modern CSS features
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API with custom service layer
- **Development**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- BounT-X PHP Backend running on port 8000

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BounT-X/bount-x-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - The frontend is configured to connect to the backend at `http://localhost:8000`
   - Ensure the backend is running before starting the frontend

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
bount-x-frontend/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.tsx      # Main admin dashboard layout
│   │   ├── AdminLogin.tsx          # Admin authentication
│   │   ├── ApplicationManagement.tsx # Manage applications
│   │   ├── BuildProjectManagement.tsx # Manage build projects
│   │   ├── DashboardHome.tsx       # Admin dashboard home
│   │   ├── HackathonManagement.tsx # Manage hackathons
│   │   ├── MeetupManagement.tsx    # Manage meetups
│   │   └── MetricsManagement.tsx   # View analytics
│   └── ZetpeakLogo.tsx            # Company logo component
├── services/
│   └── api.ts                     # API service layer
├── App.tsx                        # Main application component
├── index.tsx                      # Application entry point
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## 🔌 API Integration

The frontend communicates with the PHP backend through a centralized API service (`services/api.ts`) that handles:

- **Authentication**: JWT token management
- **Applications**: CRUD operations for community applications
- **Meetups**: Meetup data management
- **Hackathons**: Hackathon and winner information
- **Build Projects**: Project tracking and updates
- **Analytics**: KPI and metrics data

### API Endpoints Used
- `POST /api/admin/auth/login` - Admin authentication
- `GET /api/admin/stats/kpis` - Dashboard metrics
- `GET /api/admin/applications` - Application management
- `PUT /api/admin/applications/{id}` - Update application status
- `GET /api/meetups` - Public meetup listings
- `GET /api/hackathons/upcoming` - Upcoming hackathon info
- `GET /api/build-projects` - Community projects

## 🎨 Component Architecture

### Admin Components
- **AdminDashboard**: Main layout with navigation and routing
- **AdminLogin**: Secure authentication with JWT tokens
- **Management Components**: Dedicated components for each data type
- **DashboardHome**: Overview with key metrics and quick actions

### Public Components
- **App**: Main application router and layout
- **ZetpeakLogo**: Reusable branding component

## 🔐 Authentication

The admin dashboard uses JWT-based authentication:
- Login credentials are validated against the backend
- JWT tokens are stored in localStorage
- Automatic token refresh and logout on expiration
- Protected routes require valid authentication

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized for various screen sizes

## 🧪 Development Tools

- **TypeScript**: Full type safety and IntelliSense
- **Vite**: Fast development server with HMR
- **ESLint**: Code quality and consistency
- **Path Aliases**: Clean import statements with `@/` prefix

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Configuration
- Development: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Production: Configure your hosting service accordingly

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
- Check the backend README for API-related issues
- Review the browser console for client-side errors
- Ensure the backend service is running and accessible

---

**Note**: This frontend application requires the BounT-X PHP Backend to be running for full functionality. Please refer to the backend README for setup instructions.