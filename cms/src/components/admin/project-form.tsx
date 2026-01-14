'use client';

import { createProject, updateProject } from '@/app/actions/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@prisma/client';

interface ProjectFormProps {
    initialData?: Project | null;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const action = initialData ? updateProject.bind(null, initialData.id) : createProject;
    const defaultTechStack = initialData?.techStack?.join(', ') || '';

    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
                <form action={action} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="demoUrl" className="text-neutral-400 uppercase tracking-wider text-xs">Live Demo URL</Label>
                            <Input
                                id="demoUrl"
                                name="demoUrl"
                                type="url"
                                placeholder="https://"
                                defaultValue={initialData?.demoUrl || ''}
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repoUrl" className="text-neutral-400 uppercase tracking-wider text-xs">Repository URL</Label>
                            <Input
                                id="repoUrl"
                                name="repoUrl"
                                type="url"
                                placeholder="https://"
                                defaultValue={initialData?.repoUrl || ''}
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-neutral-400 uppercase tracking-wider text-xs">Project Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={initialData?.title}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-neutral-400 uppercase tracking-wider text-xs">Sort Order</Label>
                            <Input
                                id="order"
                                name="order"
                                type="number"
                                defaultValue={initialData?.order || 0}
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="techStack" className="text-neutral-400 uppercase tracking-wider text-xs">Tech Stack (Comma Separated)</Label>
                        <Input
                            id="techStack"
                            name="techStack"
                            defaultValue={defaultTechStack}
                            placeholder="React, Next.js, Node.js"
                            className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                        />
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
                            {initialData ? 'Update Evidence' : 'Log Evidence'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
