"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookA, Settings2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/public/defaultImage.png";

interface SiteCardProps {
  site: {
    id: string;
    name: string;
    subdirectory: string;
    description: string;
    imageUrl: string | null;
  };
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <Card className="p-2 border bg-muted" >
      <Image 
        src={site.imageUrl ?? DefaultImage}
        alt={site.name}
        className="rounded-lg object-cover w-full h-[200px]"
        width={450}
        height={300}
      />
      <CardHeader className="flex flex-row p-2 items-center justify-evenly w-full mt-4 mb-4">
        <div className="flex flex-col w-[200px]">
        <CardTitle className="truncate">{site.name}</CardTitle>
        <CardDescription className="line-clamp-2">{site.description}</CardDescription>
        </div>
        <div className="flex w-full items-start justify-end">
          <Button variant="outline" className="bg-muted hover:bg-black/30" asChild>
            <Link href={`/dashboard/sites/${site.id}/settings`}><Settings2Icon className="size-4"/></Link>
          </Button>
        </div>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/sites/${site.id}`} className="flex gap-2 items-center justify-center">
            <BookA className="size-4"/>View Articles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}