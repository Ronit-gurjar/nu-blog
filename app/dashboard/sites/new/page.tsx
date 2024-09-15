"use client"

import { CreateSiteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/lib/zodSchema";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function NewSiteRoute(){

    const [lastResult, action] = useFormState(CreateSiteAction, undefined)
    const [form , fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema: siteSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return(
        <>
    <div className="flex gap-2 items-center">
        <Button size="icon" variant="outline" asChild>
            <Link href="/dashboard/sites"><ArrowLeftIcon className="size-4"/></Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Site</h1>
    </div>
    <div className="flex flex-col flex-1 items-center justify-center">
        <Card>
            <CardHeader>
                <CardTitle>New Site</CardTitle>
                <CardDescription>
                Create your Site here. Below fields are the details of your site.
                </CardDescription>
            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
                <CardContent>
                <div className="flex flex-col gap-y-6">
                    <div className="grid gap-2">
                        <Label>Site</Label>
                        <Input 
                        name={fields.name.name} 
                        key={fields.name.key} 
                        defaultValue={fields.name.initialValue} 
                        placeholder="Site Name" />
                        <p className="text-red-500 text-sm">{fields.name.errors}</p>
                    </div>
 
                    <div className="grid gap-2">
                        <Label>Subdirectory</Label>
                        <Input
                        name={fields.subdirectory.name} 
                        key={fields.subdirectory.key} 
                        defaultValue={fields.subdirectory.initialValue} 
                        placeholder="Subdirectory Name" />
                        <p className="text-red-500 text-sm">{fields.subdirectory.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea 
                        name={fields.description.name} 
                        key={fields.description.key} 
                        defaultValue={fields.description.initialValue} 
                        placeholder="A Description for your site" />
                        <p className="text-red-500 text-sm">{fields.description.errors}</p>
                    </div>     
                </div>
                </CardContent>
                <CardFooter>
                    <Button>Create</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
    </>
    )
}