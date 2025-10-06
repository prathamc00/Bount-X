# Community Platform

A modern React application built with TypeScript and Vite for managing community events, hackathons, and meetups.

## Features

- Browse and discover hackathons
- Explore community meetups
- View community metrics and statistics
- Submit applications through modal interface
- Responsive design with modern UI components

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules

## Project Structure

```
├── components/          # React components
│   ├── ApplicationModal.tsx
│   ├── BuildToHackSection.tsx
│   ├── CommunityMetricsSection.tsx
│   ├── Footer.tsx
│   ├── HackathonsSection.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── Icons.tsx
│   └── MeetupsSection.tsx
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
├── App.tsx             # Main application component
├── types.ts            # TypeScript type definitions
└── index.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on your environment needs

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```
