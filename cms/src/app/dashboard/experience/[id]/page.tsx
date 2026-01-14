import { prisma } from '@/lib/db';
import { ExperienceForm } from '@/components/admin/experience-form';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function EditExperiencePage(props: PageProps) {
    const { id } = await props.params; // Next.js 15+ params are async promises? Wait, this is Next 16. It handles params differently or as usual.
    // In Next.js 15+, params is a promise.

    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                Edit Timeline Entry
            </h1>
            <ExperienceForm initialData={experience} />
        </div>
    );
}
