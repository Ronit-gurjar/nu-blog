"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface buttonProps {
    text : string,
    className?: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    icon?: ReactNode 
}

export function SubmitButton({text,className,variant,icon} : buttonProps){
    const {pending} = useFormStatus()
    return(
        <>
        {pending? (
            <div><Button variant={variant} className={cn("bg-primary/80 w-full",className)}><Loader2 className="animate-spin transition-transform mr-2 size-4"/>Processing...</Button></div>
        ):(
            <Button variant={variant} className={className}>{icon}{text}</Button>
        )}
        </>
    )
}