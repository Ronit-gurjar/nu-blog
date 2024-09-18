import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NewspaperIcon, PlusIcon, PlusSquare, Settings2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import BlogTable from "@/app/components/sites/BlogTable";

async function getData(userId: string, siteId: string){
    const data = await prisma.post.findMany({
        where:{
            userId: userId,
            siteId: siteId,
        },
        select:{
            image: true,
            id: true,
            title: true,
            createdAt: true,
        },
        orderBy:{
            createdAt:"desc"
        }
    });

    return data;
}

export default async function SiteIdRoute({params}:{params:{siteId: string};}){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/api/auth/login");
    }

    const data = await getData(user.id, params.siteId)
    return (
        <>
        <div className="flex items-center justify-evenly">
            <div>
                <h1 className="text-2xl">{}</h1>
            </div>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant="secondary">
                    <Link href="#"><NewspaperIcon className="size-4 mr-2"/> View Blog</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="#"><Settings2 className="size-4"/></Link>
                </Button>
                <Button asChild>
                <Link href={`/dashboard/sites/${params.siteId}/create`}><PlusIcon className="mr-2 size-4 items-center"/>Create Article</Link>
                </Button>   
            </div>
        </div>

        {data === undefined || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <NewspaperIcon className="size-10 text-primary"/>
            </div>
            <h2 className="font-semibold text-xl mt-2">You have no Article yet</h2>
            <p className="text-muted-foreground">You have no Articles created yet. Please create Some to see them here!</p>
            <Button asChild className="mt-2 text-primary" variant={"ghost"}>
                <Link href={`/dashboard/sites/${params.siteId}/create`}><PlusIcon className="mr-2 size-6 items-center"/>Create</Link>
            </Button>
            </div>
        ):(
            <BlogTable posts={data} siteId={params.siteId}/>
        )}
        </>
        
        
    )
}