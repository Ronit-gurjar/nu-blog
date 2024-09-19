"use client";

import { UploadDropzone } from "@/lib/uploadThingComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AtomIcon } from "lucide-react";
import Image from "next/image";
import TailwindEditor from "../../editor/EditorWrapper";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/lib/zodSchema";
import { EditPostActions } from "@/app/actions";
import slugify from "react-slugify";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "react-dom";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {

  const {toast} = useToast();
  
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);

  const [lastResult, action] = useFormState(EditPostActions, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration(){
    const inputTitle = title;

    if(inputTitle?.length === 0 || inputTitle === undefined){
        return toast({
            description: "Please set a title first",
          })
    }

    setSlugValue(slugify(inputTitle))

    return toast({
        description: "Slug generated successfully",
      })
}
  return (
    <Card className="mt-5">
            <CardHeader>
            <CardTitle>Edit Article Details</CardTitle>
            <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6" id={form.id} onSubmit={form.onSubmit} action={action}>
                    <input type="hidden" name="articleId" value={data.id} />
                    <input type="hidden" name="siteId" value={siteId} />
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input 
                        name={fields.title.name} 
                        key={fields.title.key} 
                        defaultValue={fields.title.initialValue}
                        placeholder="Blog Title"
                        onChange={(e)=>setTitle(e.target.value)}
                        value={title}
                        />
                        <p className="text-red-500 text-sm">{fields.title.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Slug</Label>
                        <Input
                        name={fields.slug.name} 
                        key={fields.slug.key} 
                        defaultValue={fields.slug.initialValue}
                        onChange={(e) => setSlugValue(e.target.value)}
                        value={slug} 
                        placeholder="Blog Slug"/>
                        <p className="text-red-500 text-sm">{fields.slug.errors}</p>
                        <Button className="w-fit" variant="secondary" type="button" onClick={handleSlugGeneration}>
                            <AtomIcon className="size-4 mr-2"/>Generate
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea 
                        name={fields.smallDescription.name} 
                        key={fields.smallDescription.key} 
                        defaultValue={fields.smallDescription.initialValue}
                        placeholder="A small description for the article..." className="h-32"/>
                        <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Cover Image</Label>
                        <Input
                        name={fields.coverImage.name} 
                        key={fields.coverImage.key} 
                        defaultValue={fields.coverImage.initialValue}
                        value={imageUrl}
                        type="hidden"
                        />
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
                        <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Article Content</Label>
                        <Input
                        name={fields.articleContent.name} 
                        key={fields.articleContent.key} 
                        defaultValue={fields.articleContent.initialValue}
                        value={JSON.stringify(value)}
                        type="hidden"
                        />
                        <TailwindEditor onChange={setValue} initialValue={value}/>
                        <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
                    </div>
                        <SubmitButton text="Save Article" icon={<MagicWandIcon className="size-4 mr-2"/>} />
                </form>
            </CardContent>
        </Card>
  );
}