'use client';

import { createExperience, updateExperience } from '@/app/actions/experience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Experience } from '@prisma/client';

// Simple fix to extend type locally if Prisma hasn't regenerated perfectly in IDE yet, or just rely on global type
// But safer to assume 'any' casting for initialData in form if types mismatch temporarily
interface ExperienceFormProps {
    initialData?: any; // Relaxed type for convenience during rapid schema changes
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
    const action = initialData ? updateExperience.bind(null, initialData.id) : createExperience;

    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
                <form action={action} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-neutral-400 uppercase tracking-wider text-xs">Role</Label>
                            <Input
                                id="role"
                                name="role"
                                defaultValue={initialData?.role}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-neutral-400 uppercase tracking-wider text-xs">Company</Label>
                            <Input
                                id="company"
                                name="company"
                                defaultValue={initialData?.company}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-neutral-400 uppercase tracking-wider text-xs">From (Start Date)</Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                defaultValue={initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : ''}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate" className="text-neutral-400 uppercase tracking-wider text-xs">To (End Date)</Label>
                            <div className="flex flex-col gap-1">
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    defaultValue={initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : ''}
                                    className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                                />
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Leave empty for &quot;Present&quot;</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-neutral-400 uppercase tracking-wider text-xs">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={initialData?.description}
                            required
                            className="min-h-[150px] bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => window.history.back()} className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 uppercase tracking-widest">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                            {initialData ? 'Update Entry' : 'Create Entry'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
