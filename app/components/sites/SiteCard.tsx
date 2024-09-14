"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookA } from "lucide-react";
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
      <CardHeader>
        <CardTitle>{site.name}/{site.subdirectory}</CardTitle>
        <CardDescription>{site.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="#" className="flex gap-2 items-center justify-center">
            <BookA className="size-4"/>View Articles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}