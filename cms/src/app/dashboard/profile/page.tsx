import { prisma } from '@/lib/db';
import { ProfileForm } from '@/components/admin/profile-form';
import { ChangePasswordForm } from '@/components/admin/change-password-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function ProfilePage() {
    let profile = null;
    try {
        const rawProfile = await prisma.profile.findFirst({
            include: { images: true }
        });
        if (rawProfile) {
            profile = {
                ...rawProfile,
                imageUrl: rawProfile.images.find(img => img.isActive)?.url || null
            };
        }
    } catch (e) {
        console.error("Prisma Client Error:", e);
    }

    // Fetch uploaded images from database
    let uploadedImages: string[] = [];
    if (profile?.id) {
        try {
            const dbImages = await prisma.profileImage.findMany({
                where: { profileId: profile.id },
                orderBy: { createdAt: 'desc' },
                select: { url: true }
            });
            uploadedImages = dbImages.map(img => img.url);
        } catch (error) {
            console.log('Error fetching image history:', error);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-neutral-200 uppercase tracking-widest">Profile Configuration</h1>
            <div className="max-w-4xl space-y-8">
                <Card className="bg-neutral-900 border-neutral-800">
                    <CardHeader>
                        <CardTitle className="text-neutral-200">Core Identity Data</CardTitle>
                        <CardDescription className="text-neutral-500">
                            Manage your primary Variant attributes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileForm profile={profile} uploadedImages={uploadedImages} />
                    </CardContent>
                </Card>

                <ChangePasswordForm />
            </div>
        </div>
    );
}
