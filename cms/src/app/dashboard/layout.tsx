import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, User, Briefcase, FolderArchive, Zap, FileText, SquareTerminal, LogOut } from 'lucide-react'
import Link from "next/link"
import { logout } from "@/app/actions/auth"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-200">
            {/* Sidebar */}
            <div className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col">
                <div className="p-6">
                    <h2 className="text-lg font-bold tracking-widest text-orange-500 uppercase flex items-center gap-2">
                        <SquareTerminal className="w-5 h-5" />
                        TVA CMS
                    </h2>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Variant Record Database</p>
                </div>
                <Separator className="bg-neutral-800" />
                <ScrollArea className="flex-1 px-4 py-6">
                    <nav className="flex flex-col gap-2">
                        <SidebarLink href="/dashboard" icon={LayoutDashboard}>Overview</SidebarLink>
                        <SidebarLink href="/dashboard/profile" icon={User}>Profile Identity</SidebarLink>
                        <SidebarLink href="/dashboard/experience" icon={Briefcase}>Timeline Data</SidebarLink>
                        <SidebarLink href="/dashboard/projects" icon={FolderArchive}>Evidence Vault</SidebarLink>
                        <SidebarLink href="/dashboard/skills" icon={Zap}>Competencies</SidebarLink>
                        <SidebarLink href="/dashboard/references" icon={FileText}>Classified Files</SidebarLink>
                    </nav>
                </ScrollArea>
                <div className="p-4 border-t border-neutral-800">
                    <form action={logout}>
                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-950/20" type="submit">
                            <LogOut className="mr-2 h-4 w-4" />
                            Disconnect
                        </Button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function SidebarLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Button asChild variant="ghost" className="justify-start hover:bg-neutral-900 hover:text-orange-500 transition-colors">
            <Link href={href}>
                <Icon className="mr-2 h-4 w-4" />
                {children}
            </Link>
        </Button>
    )
}
