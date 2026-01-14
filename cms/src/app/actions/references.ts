'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createReference(formData: FormData) {
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const order = parseInt(formData.get('order') as string) || 0;

    await prisma.reference.create({
        data: { name, company, order },
    });

    revalidatePath('/dashboard/references');
    redirect('/dashboard/references');
}

export async function updateReference(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const order = parseInt(formData.get('order') as string) || 0;

    await prisma.reference.update({
        where: { id },
        data: { name, company, order },
    });

    revalidatePath('/dashboard/references');
    redirect('/dashboard/references');
}

export async function deleteReference(id: string) {
    await prisma.reference.delete({ where: { id } });
    revalidatePath('/dashboard/references');
}
