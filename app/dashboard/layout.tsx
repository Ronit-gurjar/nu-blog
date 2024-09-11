import Link from "next/link";
import { ReactNode } from "react";
import { DashboardItems } from "../components/dashboard/DashboardItems";
import { DollarSignIcon, GlobeIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { ThemeToggle } from "../components/dashboard/theme-toggel";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export const navlinks = [
    {
        name : 'Dashboard',
        href : '/dashboard',
        icon : HomeIcon  
    },
    {
        name : 'Sites',
        href : '/dashboard/sites',
        icon : GlobeIcon  
    },
    {
        name : 'pricing',
        href : '/dashboard/pricing',
        icon : DollarSignIcon 
    }
]
export default function DashboardLayout({children} : {children : ReactNode}){
    return(
        <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                    <h3 className="text-2xl"><span className="text-primary italic">nu</span>-Blog</h3>
                    </Link>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4">
                            <DashboardItems />
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
                    <div className="ml-auto flex items-center gap-x-5">
                    <LogoutLink><Button variant={"outline"} className="flex gap-1"><LogOutIcon className="h-[1.2rem] w-[1.2rem]"/>Logout</Button></LogoutLink>    
                    <ThemeToggle/>
                    </div>
                </header>
            </div>
        </section>
    )
}