import { ReferenceForm } from '@/components/admin/reference-form';

export default function CreateReferencePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                New Classified File
            </h1>
            <ReferenceForm />
        </div>
    );
}
