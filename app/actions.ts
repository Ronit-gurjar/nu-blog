"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {parseWithZod} from "@conform-to/zod"
import { siteSchema } from "@/lib/zodSchema";
import prisma from "@/lib/db";

//Creates Site for an authenticated user
export async function CreateSiteAction(prevState: any, formData : FormData) {
    const {getUser} = getKindeServerSession();

    const user = await getUser();

    if(!user){
        return redirect("/api/auth/login");
    }

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