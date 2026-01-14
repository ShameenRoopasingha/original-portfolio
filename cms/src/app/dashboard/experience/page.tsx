import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { TableWrapper } from '@/components/admin/experience-table';

export default async function ExperiencePage() {
    const experiences = await prisma.experience.findMany({
        orderBy: { startDate: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                    Timeline Data
                </h1>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                    <Link href="/dashboard/experience/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Entry
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900">
                <TableWrapper experiences={experiences} />
            </div>
        </div>
    );
}
