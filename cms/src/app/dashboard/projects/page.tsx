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
import { Plus, Pencil, Trash2, Globe, Code } from 'lucide-react';
import Link from 'next/link';
import { deleteProject } from '@/app/actions/projects';

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                    Evidence Vault
                </h1>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-black font-bold uppercase tracking-widest">
                    <Link href="/dashboard/projects/create">
                        <Plus className="mr-2 h-4 w-4" /> New Evidence
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                            <TableHead className="text-neutral-400">Order</TableHead>
                            <TableHead className="text-neutral-400">Title</TableHead>
                            <TableHead className="text-neutral-400">Tech Stack</TableHead>
                            <TableHead className="text-neutral-400">Live Demo</TableHead>
                            <TableHead className="text-neutral-400">Repository</TableHead>
                            <TableHead className="text-right text-neutral-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableCell className="font-mono text-neutral-500">{project.order}</TableCell>
                                <TableCell className="font-medium text-neutral-200">{project.title}</TableCell>
                                <TableCell className="text-neutral-300 gap-1 flex flex-wrap">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="bg-neutral-800 px-2 py-0.5 rounded text-xs text-neutral-400">
                                            {tech}
                                        </span>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {project.demoUrl ? (
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400" title="Live Demo">
                                            <Globe className="h-4 w-4" />
                                        </a>
                                    ) : (
                                        <span className="text-neutral-700">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {project.repoUrl ? (
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300" title="Source Code">
                                            <Code className="h-4 w-4" />
                                        </a>
                                    ) : (
                                        <span className="text-neutral-700">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-900/20 hover:text-orange-500">
                                            <Link href={`/dashboard/projects/${project.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deleteProject.bind(null, project.id)}>
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
