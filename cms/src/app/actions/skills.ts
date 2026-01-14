'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSkill(formData: FormData) {
    const name = formData.get('name') as string;
    const level = parseInt(formData.get('level') as string) || 0;
    const order = parseInt(formData.get('order') as string) || 0;

    await prisma.skill.create({
        data: { name, level, order },
    });

    revalidatePath('/dashboard/skills');
    redirect('/dashboard/skills');
}

export async function updateSkill(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const level = parseInt(formData.get('level') as string) || 0;
    const order = parseInt(formData.get('order') as string) || 0;

    await prisma.skill.update({
        where: { id },
        data: { name, level, order },
    });

    revalidatePath('/dashboard/skills');
    redirect('/dashboard/skills');
}

export async function deleteSkill(id: string) {
    await prisma.skill.delete({ where: { id } });
    revalidatePath('/dashboard/skills');
}
