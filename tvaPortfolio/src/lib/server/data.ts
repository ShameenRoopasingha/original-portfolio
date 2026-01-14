import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache';

export async function getProfile() {
    noStore();
    const profile = await prisma.profile.findFirst({
        include: { images: true }
    });
    // Fallback if seeded data missing, though it shouldn't be
    if (!profile) {
        return {
            id: 'fallback-id',
            name: 'Variant',
            role: 'Unknown',
            summary: 'No data found.',
            tagline: 'TVA',
            imageUrl: '/images/image.png', // Default
            colorFilter: 'tva',
        };
    }

    return {
        ...profile,
        imageUrl: profile.images.find(img => img.isActive)?.url || '/images/image.png'
    };
}

export async function getExperience() {
    noStore();
    return await prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
    });
}

export async function getProjects() {
    noStore();
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' }
    });
    console.log('DEBUG URLs:', projects.map(p => ({ title: p.title, demoUrl: p.demoUrl })));
    return projects;
}

export async function getSkills() {
    noStore();
    return await prisma.skill.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getReferences() {
    noStore();
    return await prisma.reference.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getAllData() {
    noStore();
    const [profile, experience, projects, skills, references] = await Promise.all([
        getProfile(),
        getExperience(),
        getProjects(),
        getSkills(),
        getReferences(),
    ]);

    return {
        profile,
        experience,
        projects,
        skills,
        references,
    };
}
