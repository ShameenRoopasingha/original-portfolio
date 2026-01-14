'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function getProfile() {
    return await prisma.profile.findFirst({
        include: {
            images: true
        }
    });
}

export async function updateProfile(formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const summary = formData.get('summary') as string;
    const colorFilter = formData.get('colorFilter') as string;

    let imageUrl: string | undefined;
    const imageFile = formData.get('image') as File | null;

    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure unique filename
        const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
        const relativePath = `/uploads/${filename}`;
        const uploadPath = join(process.cwd(), 'public', 'uploads', filename);

        // Ensure directory exists
        if (!existsSync(join(process.cwd(), 'public', 'uploads'))) {
            mkdirSync(join(process.cwd(), 'public', 'uploads'), { recursive: true });
        }

        await writeFile(uploadPath, buffer);
        imageUrl = relativePath;
    } else {
        const existingImage = formData.get('existingImage') as string | null;
        if (existingImage && existingImage.trim() !== '') {
            imageUrl = existingImage;
        }
    }

    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
        // If we have a new image URL, handle profile image update
        if (imageUrl) {
            // Deactivate all current images
            await prisma.profileImage.updateMany({
                where: { profileId: existingProfile.id },
                data: { isActive: false }
            });

            // Create new active image
            await prisma.profileImage.create({
                data: {
                    url: imageUrl,
                    isActive: true,
                    profileId: existingProfile.id
                }
            });
        }

        await prisma.profile.update({
            where: { id: existingProfile.id },
            data: {
                name,
                role,
                summary,
                colorFilter,
            },
        });
    } else {
        const newProfile = await prisma.profile.create({
            data: {
                name,
                role,
                summary,
                tagline: 'VARIANT DETECTED',
                colorFilter: colorFilter || 'tva',
            },
        });

        if (imageUrl) {
            await prisma.profileImage.create({
                data: {
                    url: imageUrl,
                    isActive: true,
                    profileId: newProfile.id
                }
            });
        }
    }

    revalidatePath('/');
}
