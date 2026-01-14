'use client';

import { updateProfile } from '@/app/actions/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageSelector } from '@/components/admin/image-selector';
import { toast } from 'react-toastify';
import { useTransition, useState, useEffect } from 'react';

interface ProfileFormProps {
    profile: any;
    uploadedImages: string[];
}

export function ProfileForm({ profile, uploadedImages }: ProfileFormProps) {
    const [isPending, startTransition] = useTransition();

    const [colorFilter, setColorFilter] = useState(profile?.colorFilter || 'tva');

    // Sync state with props if profile updates from server action
    useEffect(() => {
        if (profile?.colorFilter) {
            setColorFilter(profile.colorFilter);
        }
    }, [profile]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                await updateProfile(formData);
                toast.success("Profile Updated Successfully!", {
                    position: "top-right",
                    theme: "dark"
                });
            } catch (error) {
                toast.error("Update Failed. Access Denied.", {
                    position: "top-right",
                    theme: "dark"
                });
            }
        });
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-400 uppercase tracking-wider text-xs">Variant Name</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={profile?.name}
                        className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role" className="text-neutral-400 uppercase tracking-wider text-xs">Assigned Role</Label>
                    <Input
                        id="role"
                        name="role"
                        defaultValue={profile?.role}
                        className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="colorFilter" className="text-neutral-400 uppercase tracking-wider text-xs">Visual Filter Protocol</Label>
                <select
                    id="colorFilter"
                    name="colorFilter"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 focus-visible:ring-orange-500 rounded-md h-10 px-3 text-sm"
                >
                    <option value="tva">TVA Standard (Amber)</option>
                    <option value="bw">Noir Protocol (B&W)</option>
                    <option value="matrix">Matrix Glitch (Green)</option>
                    <option value="none">None</option>
                </select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image" className="text-neutral-400 uppercase tracking-wider text-xs">New Verification Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500 file:bg-orange-900/20 file:text-orange-500 file:border-0 file:mr-4 file:py-1 file:px-2 file:rounded-sm hover:file:bg-orange-900/40"
                />
            </div>

            {/* Image History Selector */}
            <ImageSelector images={uploadedImages} currentImage={profile?.imageUrl} />

            <div className="space-y-2">
                <Label htmlFor="summary" className="text-neutral-400 uppercase tracking-wider text-xs">Record Summary</Label>
                <Textarea
                    id="summary"
                    name="summary"
                    defaultValue={profile?.summary}
                    className="min-h-[150px] bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                />
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest disabled:opacity-50"
                >
                    {isPending ? 'Processing...' : 'Update Record'}
                </Button>
            </div>
        </form>
    );
}
