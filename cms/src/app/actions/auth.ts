'use server';

import { cookies } from 'next/headers';

import { prisma } from '@/lib/db';
import { verifyPassword, hashPassword } from '@/lib/server/auth';

export async function login(password: string) {
    let admin = null;
    try {
        admin = await prisma.admin.findUnique({
            where: { username: 'admin' },
        });
    } catch (e) {
        console.warn('Failed to fetch admin from DB, falling back to env auth:', e);
    }

    let isValid = false;

    if (admin) {
        isValid = await verifyPassword(password, admin.password);
    } else if (password === process.env.ADMIN_PASSWORD) {
        // Fallback to env password if no admin user exists (e.g. migration failed)
        isValid = true;
    }

    if (isValid) {
        const cookieStore = await cookies();
        cookieStore.set('auth_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        return { success: true };
    }
    return { success: false };
}

export async function changePassword(currentPassword: string, newPassword: string) {
    // Check if Prisma Client is updated (handles case where server wasn't restarted after migration)
    // @ts-ignore - accessing potential runtime property
    if (!prisma.admin) {
        return { success: false, error: 'System Update Required: Please restart the CMS server to enable database writes.' };
    }

    const admin = await prisma.admin.findUnique({ where: { username: 'admin' } });

    if (!admin) {
        // If using env password, we can't change it via DB unless we create the user now
        if (currentPassword === process.env.ADMIN_PASSWORD) {
            const hashedPassword = await hashPassword(newPassword);
            await prisma.admin.create({
                data: {
                    username: 'admin',
                    password: hashedPassword
                }
            });
            return { success: true };
        }
        return { success: false, error: 'Admin user not found' };
    }

    const isValid = await verifyPassword(currentPassword, admin.password);
    if (!isValid) return { success: false, error: 'Invalid current password' };

    const hashedPassword = await hashPassword(newPassword);
    await prisma.admin.update({
        where: { username: 'admin' },
        data: { password: hashedPassword },
    });

    return { success: true };
}

import { redirect } from 'next/navigation';

// ... imports

// ... login and changePassword

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    redirect('/login');
}
