import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteExperience } from '@/app/actions/experience';

import { Experience } from '@prisma/client';

export function TableWrapper({ experiences }: { experiences: Experience[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                    <TableHead className="text-neutral-400">Role</TableHead>
                    <TableHead className="text-neutral-400">Company</TableHead>
                    <TableHead className="text-neutral-400">Start Date</TableHead>
                    <TableHead className="text-neutral-400">End Date</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {experiences.map((exp) => (
                    <TableRow key={exp.id} className="border-neutral-800 hover:bg-neutral-800/50">
                        <TableCell className="font-medium text-neutral-200">{exp.role}</TableCell>
                        <TableCell className="text-neutral-300">{exp.company}</TableCell>
                        <TableCell className="text-neutral-300">
                            {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-neutral-300">
                            {exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                : <span className="text-green-500 font-bold text-xs uppercase tracking-wider">Present</span>
                            }
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-900/20 hover:text-orange-500">
                                    <Link href={`/dashboard/experience/${exp.id}`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <form action={deleteExperience.bind(null, exp.id)}>
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
    );
}
