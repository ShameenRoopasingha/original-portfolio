'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function reorderItems(model: 'experience' | 'project' | 'skill' | 'reference', items: { id: string; order: number }[]) {
    try {
        const transaction = items.map((item) =>
            // @ts-ignore - Dynamic model access with Prisma is tricky in TS, but safe here with specific allowed models
            prisma[model].update({
                where: { id: item.id },
                data: { order: item.order }
            })
        );

        await prisma.$transaction(transaction);

        // Revalidate all dashboard pages as they might be affected
        revalidatePath('/dashboard');
    } catch (error) {
        console.error('Failed to reorder items:', error);
        throw new Error('Failed to reorder items');
    }
}
