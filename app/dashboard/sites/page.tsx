import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
export default function SitesRoute(){
    return(
        <>
        <div className="flex w-full justify-between items-center">
            <h1 className="font-semibold text-2xl">Sites</h1>
            <Button asChild variant={"secondary"}>
                <Link href={"/dashboard/sites/new"}><PlusIcon className="mr-2 size-6 items-center"/>New Site</Link>
            </Button>
        </div>
        <Separator className="-mt-4"/>
        
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <FileIcon className="size-10 text-primary"/>
            </div>
            <h2 className="font-semibold text-xl mt-2">You have no sites yet</h2>
            <p className="text-muted-foreground">You have no site created yet. Please create Some to see them here!</p>
            <Button asChild className="mt-2 text-primary" variant={"ghost"}>
                <Link href={"/dashboard/sites/new"}><PlusIcon className="mr-2 size-6 items-center"/>Create</Link>
            </Button>
        </div>
        </>
    )
}