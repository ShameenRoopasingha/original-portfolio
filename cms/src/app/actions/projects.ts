'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const techStackString = formData.get('techStack') as string;
    const demoUrl = (formData.get('demoUrl') as string) || null;
    const repoUrl = (formData.get('repoUrl') as string) || null;
    const order = parseInt(formData.get('order') as string) || 0;

    const techStack = techStackString.split(',').map((t) => t.trim()).filter(Boolean);

    await prisma.project.create({
        data: { title, description, techStack, order, demoUrl, repoUrl },
    });

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const techStackString = formData.get('techStack') as string;
    const demoUrl = (formData.get('demoUrl') as string) || null;
    const repoUrl = (formData.get('repoUrl') as string) || null;
    const order = parseInt(formData.get('order') as string) || 0;

    const techStack = techStackString.split(',').map((t) => t.trim()).filter(Boolean);

    await prisma.project.update({
        where: { id },
        data: { title, description, techStack, order, demoUrl, repoUrl },
    });

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/dashboard/projects');
}
