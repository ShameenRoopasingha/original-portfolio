import { prisma } from '@/lib/db';
import { ProjectForm } from '@/components/admin/project-form';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

export default async function EditProjectPage(props: PageProps) {
    const { id } = await props.params;

    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                Update Evidence Record
            </h1>
            <ProjectForm initialData={project} />
        </div>
    );
}
