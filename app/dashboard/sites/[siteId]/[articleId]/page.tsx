import { EditArticleForm } from "@/app/components/dashboard/forms/EditArticleForm";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const data = await getData(params.articleId);
  return (
    <div>
      <div className="flex gap-2 items-center">
            <Button size="icon" variant="outline" className="mr-3" asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}><ArrowLeftIcon className="size-4"/></Link>
            </Button>
            <h1 className="text-xl font-semibold">Edit Article</h1>
        </div>

      <EditArticleForm data={data} siteId={params.siteId} />
    </div>
  );
}