'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExperience(formData: FormData) {
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const description = formData.get('description') as string;

    const startDateRaw = formData.get('startDate') as string;
    const endDateRaw = formData.get('endDate') as string;

    const startDate = startDateRaw ? new Date(startDateRaw) : new Date();
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    // Generate 'year' string automatically
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    let year = formatDate(startDate);
    year += endDate ? ` - ${formatDate(endDate)}` : ' - Present';

    // Auto-assign order: Get max order + 1, default to 0
    const lastItem = await prisma.experience.findFirst({
        orderBy: { order: 'desc' }
    });
    const order = (lastItem?.order ?? -1) + 1;

    await prisma.experience.create({
        data: { role, company, year, startDate, endDate, description, order },
    });

    revalidatePath('/dashboard/experience');
    redirect('/dashboard/experience');
}

export async function updateExperience(id: string, formData: FormData) {
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const description = formData.get('description') as string;

    const startDateRaw = formData.get('startDate') as string;
    const endDateRaw = formData.get('endDate') as string;

    const startDate = startDateRaw ? new Date(startDateRaw) : new Date();
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    // Generate 'year' string automatically
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    let year = formatDate(startDate);
    year += endDate ? ` - ${formatDate(endDate)}` : ' - Present';

    // We keep 'order' but it's less relevant now, though we preserve it to not break existing fields
    const order = parseInt(formData.get('order') as string) || 0;

    await prisma.experience.update({
        where: { id },
        data: { role, company, year, startDate, endDate, description, order },
    });

    revalidatePath('/dashboard/experience');
    redirect('/dashboard/experience');
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({ where: { id } });
    revalidatePath('/dashboard/experience');
}
