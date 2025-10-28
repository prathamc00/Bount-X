// FIX: Import ProjectStatus enum to resolve reference errors.
import { MeetupEvent, HackathonProject, UpcomingHackathon, BuildProject, CommunityMetric, ProjectStatus } from '../types';

export const meetupEvents: MeetupEvent[] = [
    {
        id: 'meetup-1',
        title: 'Decentralized AI & The Future of Computation',
        date: '2024-09-15T18:00:00Z',
        location: 'Bengaluru, India',
        topic: 'AI/ML',
        rsvpUrl: '#',
        tags: ['Web3', 'AI', 'Networking', 'Deep Tech'],
    },
    {
        id: 'meetup-2',
        title: 'Designing for Immersive Realities (AR/VR)',
        date: '2024-10-05T18:00:00Z',
        location: 'Bengaluru, India',
        topic: 'Design',
        rsvpUrl: '#',
        tags: ['AR/VR', 'UX/UI', 'Spatial Computing', 'Workshops'],
    },
    {
        id: 'meetup-3',
        title: 'Quantum Security & Post-Quantum Cryptography',
        date: '2024-11-20T18:00:00Z',
        location: 'Bengaluru, India',
        topic: 'Security',
        rsvpUrl: '#',
        tags: ['Cryptography', 'Security', 'Research', 'Networking'],
    },
];

export const pastHackathonProjects: HackathonProject[] = [
    {
        id: 'proj-1',
        name: 'Project Chimera',
        team: ['Alex Turing', 'Samira Chen', 'Leo Rivera'],
        description: 'A real-time threat detection system using a novel ML model to analyze network traffic patterns.',
        githubUrl: '#',
        prize: '1st Place',
        year: 2023,
    },
    {
        id: 'proj-2',
        name: 'Aetheria',
        team: ['Elena Vasquez', 'Ben Carter'],
        description: 'Decentralized cloud storage solution offering provable data possession and enhanced privacy features.',
        githubUrl: '#',
        prize: 'Community Choice',
        year: 2023,
    }
];

export const upcomingHackathon: UpcomingHackathon | null = {
    id: 'hack-upcoming-1',
    title: 'Singularity Sprint',
    theme: 'Human-AI Symbiosis',
    startDate: '2024-12-01T09:00:00Z',
    endDate: '2024-12-03T17:00:00Z',
    registrationUrl: '#',
    prizes: ['₹8,00,000 Grand Prize', 'GPU Cloud Credits', 'Industry Mentorship'],
};

export const buildProjects: BuildProject[] = [
    {
        id: 'build-1',
        name: 'Neura',
        creator: 'Jasmine Patel',
        description: 'A personal knowledge graph application that intelligently connects your notes, ideas, and sources to reveal hidden patterns.',
        status: ProjectStatus.LAUNCHED,
        imageUrl: 'https://picsum.photos/seed/neura/1024/768',
        techStack: ['React', 'GraphQL', 'D3.js', 'Rust', 'WASM'],
    },
    {
        id: 'build-2',
        name: 'Flux IDE',
        creator: 'Kenji Tanaka',
        description: 'A collaborative, browser-based IDE focused on real-time pair programming and seamless environment sharing.',
        status: ProjectStatus.IN_PROGRESS,
        imageUrl: 'https://picsum.photos/seed/flux/1024/768',
        techStack: ['SvelteKit', 'WebSockets', 'Docker', 'CRDTs'],
    },
     {
        id: 'build-3',
        name: 'Cypher Protocol',
        creator: 'Anonymous',
        description: 'An end-to-end encrypted communication protocol designed for maximum security and minimal metadata leakage.',
        status: ProjectStatus.FUNDED,
        imageUrl: 'https://picsum.photos/seed/cypher/1024/768',
        techStack: ['Zero-Knowledge Proofs', 'Go', 'Libp2p'],
    }
];

export const communityMetrics: CommunityMetric[] = [
    { id: 'metric-1', label: 'Active Members', value: 1337, trend: 'up' },
    { id: 'metric-2', label: 'Projects Launched', value: 84, trend: 'up' },
    { id: 'metric-3', label: 'Represented Countries', value: 42, trend: 'stable' },
    { id: 'metric-4', label: 'Commits This Month', value: 9871, unit: 'k', trend: 'up' },
];