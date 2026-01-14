'use client';

import { useState } from 'react';
import { changePassword } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export function ChangePasswordForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('currentPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const result = await changePassword(currentPassword, newPassword);

            if (result.success) {
                toast.success("Access Protocol Updated Successfully");
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(result.error || "Failed to update protocol");
            }
        } catch {
            toast.error("Unexpected Timeline Error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="bg-neutral-900 border-neutral-800 mt-8">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <Lock className="w-4 h-4 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl uppercase tracking-widest text-neutral-200">Security Protocols</CardTitle>
                </div>
                <CardDescription className="text-neutral-500 uppercase tracking-wider text-xs">
                    Update Variant Access Credentials
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-neutral-400 uppercase tracking-wider text-xs">Current Access Code</Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            required
                            className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-neutral-400 uppercase tracking-wider text-xs">New Access Code</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            required
                            className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-neutral-400 uppercase tracking-wider text-xs">Confirm Access Code</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest w-full"
                    >
                        {loading ? 'Updating Protocols...' : 'Update Credentials'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
