
export enum Skill {
  HACKER = 'Hacker',
  DESIGNER = 'Designer',
  DEVELOPER = 'Developer',
}

export enum ExperienceLevel {
  JUNIOR = 'Junior',
  MID = 'Mid-Level',
  SENIOR = 'Senior',
}

export interface ApplicationFormData {
  name: string;
  email: string;
  skill: Skill | '';
  experience: ExperienceLevel | '';
  portfolioUrl: string;
  reason: string;
}

export interface MeetupEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  topic: string;
  rsvpUrl: string;
  tags: string[];
}

export interface HackathonProject {
  id: string;
  name: string;
  team: string[];
  description: string;
  githubUrl: string;
  prize?: string;
  year: number;
}

export interface UpcomingHackathon {
  id: string;
  title: string;
  theme: string;
  startDate: string;
  endDate: string;
  registrationUrl: string;
  prizes: string[];
}

export enum ProjectStatus {
  IN_PROGRESS = 'In Progress',
  LAUNCHED = 'Launched',
  FUNDED = 'Funded',
}

export interface BuildProject {
  id: string;
  name: string;
  creator: string;
  description: string;
  status: ProjectStatus;
  imageUrl: string;
  techStack: string[];
}

export interface CommunityMetric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
}
