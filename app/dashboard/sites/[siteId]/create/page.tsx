"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { UploadButton, UploadDropzone } from "@/lib/uploadThingComponent";
import { ArrowBigLeft, ArrowLeftIcon, AtomIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { JSONContent } from "novel";
import TailwindEditor from "@/app/components/editor/EditorWrapper";

export default function ArticleCreationRoute({params}: {params:{siteId: string};}){
    const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
    const [value, setValue] = useState<undefined | JSONContent>(undefined);
    const {toast} = useToast();
    return(
        <>
        <div className="flex gap-2 items-center">
            <Button size="icon" variant="outline" asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}><ArrowLeftIcon className="size-4"/></Link>
            </Button>
            <h1 className="text-xl font-semibold">Create Article</h1>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>New Article Details</CardTitle>
            <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input placeholder="Blog Title"/>
                    </div>
                    <div className="grid gap-2">
                        <Label>Slug</Label>
                        <Input placeholder="Blog Slug"/>
                        <Button className="w-fit" variant="secondary" type="button">
                            <AtomIcon className="size-4 mr-2"/>Generate
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea placeholder="A small description for the article..." className="h-32"/>
                    </div>
                    <div className="grid gap-2">
                        <Label>Cover Image</Label>
                        {imageUrl? (
                            <Image 
                            src={imageUrl}
                            alt="uploaded image"
                            width={200}
                            height={200}
                            className="object-cover rounded-lg"
                        />
                        ):(
                            <UploadDropzone  onClientUploadComplete={(res)=>{
                                setImageUrl(res[0].url);
                                toast({
                                    title: "Successful",
                                    description: "Image uploaded successfully",
                                  })
                            }}
                            className="bg-muted"
                            endpoint="imageUploader" 
                            onUploadError={()=>{
                                toast({
                                    variant: "destructive",
                                    title: "Error",
                                    description: "Something went wrong, try again!",
                                  })
                            }}
                            />
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Article Content</Label>
                        <TailwindEditor onChange={setValue} initialValue={value}/>
                    </div>
                </form>
            </CardContent>
        </Card>
        </>
    )
}