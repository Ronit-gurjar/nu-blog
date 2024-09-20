"use server"

import { redirect } from "next/navigation";
import {parseWithZod} from "@conform-to/zod"
import { PostSchema, siteSchema } from "@/lib/zodSchema";
import prisma from "@/lib/db";
import { useRequireUser } from "@/lib/useRequireUser";

//Creates Site for an authenticated user
export async function CreateSiteAction(prevState: any, formData : FormData) {
   
    const user = await useRequireUser();

    const userInput = parseWithZod(formData,{
        schema: siteSchema,
    })

    if(userInput.status !== "success"){
        return userInput.reply();
    }

    const respone = await prisma.site.create({
        data:{
            name: userInput.value.name,
            subdirectory: userInput.value.subdirectory,
            description: userInput.value.description,
            userId: user.id
        },
    });

    return redirect("/dashboard/sites");
}
export async function CreatePostAction(prevState: any, formData: FormData) {
    const user = await useRequireUser();
    
    const submission = parseWithZod (formData, {
    schema: PostSchema,
    }); 

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.post.create({
        data: {
          title: submission.value.title,
          smallDescription: submission.value.smallDescription,
          slug: submission.value.slug,
          articleContent: JSON.parse(submission.value.articleContent),
          image: submission.value.coverImage,
          userId: user.id,
          siteId: formData.get("siteId") as string,
        },
      });
    
      return redirect(`/dashboard/sites/${formData.get("siteId")}`);
    }

    export async function EditPostActions(prevState: any, formData: FormData) {
        const user = await useRequireUser();
      
        const submission = parseWithZod(formData, {
          schema: PostSchema,
        });
      
        if (submission.status !== "success") {
          return submission.reply();
        }
      
        const data = await prisma.post.update({
          where: {
            userId: user.id,
            id: formData.get("articleId") as string,
          },
          data: {
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,
          },
        });

        return redirect(`/dashboard/sites/${formData.get("siteId")}`);
    }

    export async function DeletePost(formData: FormData) {
      const user = await useRequireUser();
    
      const data = await prisma.post.delete({
        where: {
          userId: user.id,
          id: formData.get("articleId") as string,
        },
      });
    
      return redirect(`/dashboard/sites/${formData.get("siteId")}`);
    }

    export async function UpdateImage(formData: FormData) {
      const user = await useRequireUser();
    
      const data = await prisma.site.update({
        where: {
          userId: user.id,
          id: formData.get("siteId") as string,
        },
        data: {
          imageUrl: formData.get("imageUrl") as string,
        },
      });
    
      return redirect(`/dashboard/sites/${formData.get("siteId")}`);
    }