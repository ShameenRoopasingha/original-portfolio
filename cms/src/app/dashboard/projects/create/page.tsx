import { ProjectForm } from '@/components/admin/project-form';

export default function CreateProjectPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                Log New Evidence
            </h1>
            <ProjectForm />
        </div>
    );
}
