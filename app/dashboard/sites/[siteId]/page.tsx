import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowLeftIcon, BookAIcon, BookOpenTextIcon, PlusIcon, Settings2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import BlogTable from "@/app/components/sites/BlogTable";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

async function getData(userId: string, siteId: string){
    const data = await prisma.site.findUnique({
        where: {
          id: siteId,
          userId: userId,
        },
        select: {
          subdirectory: true,
          posts: {
            select: {
              image: true,
              title: true,
              createdAt: true,
              id: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
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
            <div className="flex gap-2 w-fit min-w-[200px] items-center">
                <Button size="icon" variant="outline" className="mr-3" asChild>
                    <Link href={`/dashboard/sites`}><ArrowLeftIcon className="size-4"/></Link>
                </Button>
                <h1 className="text-xl font-semibold"> Site Articles</h1>
            </div>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant="secondary">
                    <Link href={`/blog/${data?.subdirectory}`}><BookOpenTextIcon className="size-4 mr-2"/> View Blog</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href={`/dashboard/sites/${params.siteId}/settings`}><Settings2 className="size-4"/></Link>
                </Button>
                <Button asChild>
                <Link href={`/dashboard/sites/${params.siteId}/create`}><PlusIcon className="mr-2 size-4 items-center"/>Create Article</Link>
                </Button>   
            </div>
        </div>

        {data?.posts === undefined || data.posts.length === 0 ? (

            <EmptyState 
            title="You have no Article yet"
            icon={<BookAIcon className="size-10 text-primary"/>}
            description="You have no Articles created yet. Please create Some to see them here!"
            href={`/dashboard/sites/${params.siteId}/create`}
            buttonText="Create"
            buttonIcon={<PlusIcon className="mr-2 size-6 items-center"/>}
            />

        ):(
            <BlogTable posts={data.posts} siteId={params.siteId}/>
        )}
        </>
        
        
    )
}