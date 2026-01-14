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
import { deleteSkill } from '@/app/actions/skills';

export default async function SkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                    Competencies
                </h1>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                    <Link href="/dashboard/skills/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                            <TableHead className="text-neutral-400">Order</TableHead>
                            <TableHead className="text-neutral-400">Name</TableHead>
                            <TableHead className="text-neutral-400">Level</TableHead>
                            <TableHead className="text-right text-neutral-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.map((skill) => (
                            <TableRow key={skill.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableCell className="font-mono text-neutral-500">{skill.order}</TableCell>
                                <TableCell className="font-medium text-neutral-200">{skill.name}</TableCell>
                                <TableCell className="text-neutral-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500" style={{ width: `${skill.level}%` }} />
                                        </div>
                                        <span className="text-xs font-mono">{skill.level}%</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-900/20 hover:text-orange-500">
                                            <Link href={`/dashboard/skills/${skill.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deleteSkill.bind(null, skill.id)}>
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
