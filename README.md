# Bount-X Community Platform

A high-velocity network for Hackers, Designers, and Developers united to build the future. This is a modern React application built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Interactive Landing Page** with Three.js particle animation
- **Community Showcase** highlighting members and projects
- **Event Management** for meetups and hackathons
- **Application System** for community membership
- **Admin Dashboard** for managing applications and content
- **Dark/Light Theme** support with smooth transitions
- **Responsive Design** optimized for all devices
- **Performance Optimized** with lazy loading and code splitting

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Animations**: Custom CSS animations + Typed.js
- **State Management**: React Context API
- **Routing**: Hash-based routing for admin panel

## Project Structure

```
├── components/           # React components
│   ├── admin/           # Admin dashboard components
│   ├── ApplicationModal.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── LandingPage.tsx
│   └── ...             # Other UI components
├── context/            # React context providers
│   └── ThemeContext.tsx
├── data/              # Mock data and constants
│   └── mockData.ts
├── hooks/             # Custom React hooks
│   └── useIntersectionObserver.ts
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── types.ts           # TypeScript type definitions
└── vite.config.ts     # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bount-x-community
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Main Application
- Visit the landing page to experience the interactive particle animation
- Click "Start Building" to enter the main community platform
- Browse community showcases, events, and projects
- Apply for membership through the application modal

### Admin Dashboard
- Access admin features by navigating to `#admin` in the URL
- Manage community applications and content
- View analytics and community metrics

### Theme Switching
- The application automatically detects system theme preference
- Manual theme switching is available through the header
- Theme preference is persisted in localStorage

## Configuration

### Vite Configuration
The project uses a custom Vite configuration with:
- React plugin for JSX support
- Path aliases (`@/` points to project root)
- Environment variable injection
- Development server on port 3000

### Tailwind CSS
Custom Tailwind configuration includes:
- Extended color palette with fuchsia and blue gradients
- Custom animations and keyframes
- Dark mode support
- Custom font families (Inter, Source Code Pro)

## Components Overview

### Core Components
- **LandingPage**: Interactive Three.js particle system
- **Header**: Navigation with theme toggle and apply button
- **HeroSection**: Main hero with animated text and CTAs
- **ApplicationModal**: Multi-step application form
- **ConstellationBackground**: Animated background elements

### Section Components
- **CommunityShowcaseSection**: Member highlights
- **MeetupsSection**: Upcoming and past events
- **HackathonsSection**: Hackathon projects and events
- **BuildToHackSection**: Project showcases
- **GetInvolvedSection**: Community engagement

## Styling Guidelines

### Color Scheme
- **Primary**: Fuchsia (`#d946ef`) and Blue (`#3b82f6`)
- **Background**: Slate variants for light/dark themes
- **Text**: Slate colors with proper contrast ratios

### Typography
- **Headings**: Inter font family, various weights
- **Code**: Source Code Pro monospace font
- **Body**: Inter with optimized line heights

### Animations
- Fade-in effects for page transitions
- Glitch effects for tech aesthetic
- Smooth hover transitions
- Particle system interactions

## Security Considerations

- Input validation on all form fields
- XSS protection through React's built-in escaping
- Secure external link handling with `rel="noopener noreferrer"`
- Environment variable protection for sensitive data

## Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Separate bundles for admin and main app
- **Image Optimization**: Responsive images with proper sizing
- **Animation Throttling**: Optimized particle system rendering
- **Bundle Analysis**: Vite's built-in optimization

## Development

### Adding New Components
1. Create component in appropriate folder under `components/`
2. Export from component file
3. Import and use in parent components
4. Add TypeScript interfaces in `types.ts` if needed

### Styling New Components
1. Use Tailwind utility classes
2. Follow existing color and spacing patterns
3. Ensure dark mode compatibility
4. Test responsive behavior

### State Management
- Use React Context for global state (theme, user data)
- Local component state for UI interactions
- localStorage for persistence (applications, theme)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built by the Bount-X Community**