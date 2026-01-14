import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
        select: { title: true, demoUrl: true, repoUrl: true }
    });
    console.log('ALL PROJECTS DATA:');
    projects.forEach(p => {
        console.log(`Title: ${p.title}`);
        console.log(`Demo URL: ${p.demoUrl}`);
        console.log(`Repo URL: ${p.repoUrl}`);
        console.log('---');
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
