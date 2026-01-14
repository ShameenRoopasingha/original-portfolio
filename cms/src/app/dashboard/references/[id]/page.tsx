import { prisma } from '@/lib/db';
import { ReferenceForm } from '@/components/admin/reference-form';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

export default async function EditReferencePage(props: PageProps) {
    const { id } = await props.params;

    const reference = await prisma.reference.findUnique({
        where: { id },
    });

    if (!reference) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                Update Classified File
            </h1>
            <ReferenceForm initialData={reference} />
        </div>
    );
}
