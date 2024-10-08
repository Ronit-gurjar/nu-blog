import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db"
import { useRequireUser } from "@/lib/useRequireUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Image from "next/image";
import Defaultimage from "@/public/defaultImage.png"
import { EmptyState } from "../components/dashboard/EmptyState";
import { BookAIcon, FileIcon, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

async function getData(userId : string){

    const [sites,articles] = await Promise.all([
        //getting sites data
        prisma.site.findMany({
            where:{
                userId : userId,
            },
            orderBy:{
                createdAt:"desc",
            },
            take: 3,
        }),
        //gettings posts data
        prisma.post.findMany({
            where:{
                userId : userId,
            },
            orderBy:{
                createdAt:"desc",
            },
            take: 3,
        }),

    ]);

    return {sites, articles}
}

export default async function DashboardIndexPage(){
    const user = await useRequireUser();
    const { articles, sites} = await getData(user.id);
    const name = user.given_name || user.family_name;
    return (
      <div>
        <h1 className="text-2xl font-semibold">
            Welcome, {name}
        </h1>
        <Separator className="mt-2"/>
        <h1 className="text-lg mt-4 font-semibold mb-5">Your Sites</h1>
        {sites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {sites.map((item) => (
              <Card key={item.id}>
                <Image
                  src={item.imageUrl ?? Defaultimage}
                  alt={item.name}
                  className="rounded-t-lg object-cover w-full h-[200px]"
                  width={400}
                  height={200}
                />
                <CardHeader>
                  <CardTitle className="truncate">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.description}
                  </CardDescription>
                </CardHeader>
  
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${item.id}`}>
                      View Articles
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
                        title="You dont have any sites created"
                        description="You currently dont have any Sites. Please create some so that you can see them right here."
                        href="/dashboard/sites/new"
                        buttonText="Create Site" icon={<FileIcon className="size-10 text-primary"/>} buttonIcon={<PlusIcon className="size-4 mr-3"/>}
            />
        )}
  
        <h1 className="text-lg mt-10 font-semibold mb-5">Recent Articles</h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {articles.map((item) => (
              <Card key={item.id}>
                <Image
                  src={item.image ?? Defaultimage}
                  alt={item.title}
                  className="rounded-t-lg object-cover w-full h-[200px]"
                  width={400}
                  height={200}
                />
                <CardHeader>
                  <CardTitle className="truncate">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.smallDescription}
                  </CardDescription>
                </CardHeader>
  
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                      Edit Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
                        title="You dont have any articles created"
                        description="Your currently dont have any articles created. Please create some so that you can see them right here"
                        buttonText="Create Article"
                        href="/dashboard/sites" icon={<BookAIcon className="size-10 text-primary"/>} buttonIcon={<PlusIcon className="size-4 mr-3"/>}
            />
        )}
      </div>
    );
  }