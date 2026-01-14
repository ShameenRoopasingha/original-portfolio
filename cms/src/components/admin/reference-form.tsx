'use client';

import { createReference, updateReference } from '@/app/actions/references';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Reference } from '@prisma/client';

interface ReferenceFormProps {
    initialData?: Reference | null;
}

export function ReferenceForm({ initialData }: ReferenceFormProps) {
    const action = initialData ? updateReference.bind(null, initialData.id) : createReference;

    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
                <form action={action} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-neutral-400 uppercase tracking-wider text-xs">Reference Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={initialData?.name}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-neutral-400 uppercase tracking-wider text-xs">Company/Organization</Label>
                            <Input
                                id="company"
                                name="company"
                                defaultValue={initialData?.company}
                                required
                                className="bg-neutral-950 border-neutral-800 text-neutral-200 focus-visible:ring-orange-500"
                            />
                        </div>
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

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => window.history.back()} className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 uppercase tracking-widest">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                            {initialData ? 'Update File' : 'Classify File'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
