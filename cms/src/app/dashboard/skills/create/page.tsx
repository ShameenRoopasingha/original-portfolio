import { SkillForm } from '@/components/admin/skill-form';

export default function CreateSkillPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                New Competency
            </h1>
            <SkillForm />
        </div>
    );
}
