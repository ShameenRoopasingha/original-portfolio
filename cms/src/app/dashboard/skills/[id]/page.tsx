import { prisma } from '@/lib/db';
import { SkillForm } from '@/components/admin/skill-form';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

export default async function EditSkillPage(props: PageProps) {
    const { id } = await props.params;

    const skill = await prisma.skill.findUnique({
        where: { id },
    });

    if (!skill) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                Edit Competency
            </h1>
            <SkillForm initialData={skill} />
        </div>
    );
}
