import { ExperienceForm } from '@/components/admin/experience-form';

export default function CreateExperiencePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                New Timeline Entry
            </h1>
            <ExperienceForm />
        </div>
    );
}
