import { usePortfolioData } from '@/components/DataProvider';

export interface Profile {
    id: string;
    name: string;
    role: string;
    summary: string;
    tagline: string;
    imageUrl?: string | null;
    colorFilter?: string;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    year: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    demoUrl?: string | null;
    repoUrl?: string | null;
    inDevelopment?: boolean;
}

export interface Skill {
    name: string;
    level: number;
}

export interface Reference {
    id: string;
    name: string;
    company: string;
}

// Re-export hooks instead of constants
export function useProfile() {
    return usePortfolioData().profile;
}

export function useExperience() {
    return usePortfolioData().experience;
}

export function useProjects() {
    return usePortfolioData().projects;
}

export function useSkills() {
    return usePortfolioData().skills;
}

export function useReferences() {
    return usePortfolioData().references;
}

// Deprecated constants (WILL BREAK IF USED DIRECTLY, INTENTIONAL to find usages)
// export const PROFILE = ... 
