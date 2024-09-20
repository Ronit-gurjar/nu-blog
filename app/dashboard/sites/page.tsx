import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteCard from "@/app/components/sites/SiteCard";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

async function getData(userId: string) {
    const data = await prisma.site.findMany({
        where:{
            userId: userId,
        },
        orderBy:{
            createdAt: "desc",
        }
    });

    return data;
}

export default async function SitesRoute(){

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user){
        return redirect("/api/auth/login")
    }
    const data = await getData(user?.id);
    return(
        <>
        <div className="flex w-full justify-between items-center">
            <h1 className="font-semibold text-2xl">Sites</h1>
            <Button asChild variant={"secondary"}>
                <Link href={"/dashboard/sites/new"}><PlusIcon className="mr-2 size-6 items-center"/>New Site</Link>
            </Button>
        </div>
        <Separator className="-mt-4"/>
        
        {data === undefined || data.length === 0 ? (

            <EmptyState 
            title="You have no sites yet" 
            icon={<FileIcon className="size-10 text-primary"/>} 
            description="You have no site created yet. Please create Some to see them here!"
            href={"/dashboard/sites/new"} 
            buttonText="Create" 
            buttonIcon={<PlusIcon className="mr-2 size-6 items-center"/>}
            />

        ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {data.map((site) => (
                    <SiteCard key={site.id} site={site} />
                ))}
            </div>
        )}
        </>
    )
}