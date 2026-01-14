import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteReference } from '@/app/actions/references';

export default async function ReferencesPage() {
    const references = await prisma.reference.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                    Classified Files
                </h1>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                    <Link href="/dashboard/references/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Reference
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                            <TableHead className="text-neutral-400">Order</TableHead>
                            <TableHead className="text-neutral-400">Name</TableHead>
                            <TableHead className="text-neutral-400">Company</TableHead>
                            <TableHead className="text-right text-neutral-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {references.map((ref) => (
                            <TableRow key={ref.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableCell className="font-mono text-neutral-500">{ref.order}</TableCell>
                                <TableCell className="font-medium text-neutral-200">{ref.name}</TableCell>
                                <TableCell className="text-neutral-300">{ref.company}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-900/20 hover:text-orange-500">
                                            <Link href={`/dashboard/references/${ref.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deleteReference.bind(null, ref.id)}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-900/20 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
