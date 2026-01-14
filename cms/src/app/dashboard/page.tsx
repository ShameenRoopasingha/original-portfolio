import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FolderArchive, Zap, FileText } from 'lucide-react';

export default async function DashboardPage() {
    const [experienceCount, projectCount, skillCount, referenceCount] = await Promise.all([
        prisma.experience.count(),
        prisma.project.count(),
        prisma.skill.count(),
        prisma.reference.count(),
    ]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light text-orange-500 uppercase tracking-widest">
                System Overview
            </h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Timeline Entries"
                    value={experienceCount}
                    icon={Briefcase}
                    description="Career History"
                />
                <StatCard
                    title="Evidence Files"
                    value={projectCount}
                    icon={FolderArchive}
                    description="Project Vault"
                />
                <StatCard
                    title="Competencies"
                    value={skillCount}
                    icon={Zap}
                    description="Skill Sets"
                />
                <StatCard
                    title="Classified Files"
                    value={referenceCount}
                    icon={FileText}
                    description="References"
                />
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, description }: any) {
    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-neutral-200">{value}</div>
                <p className="text-xs text-neutral-500 pt-1 uppercase tracking-wider">{description}</p>
            </CardContent>
        </Card>
    );
}
