import { Button } from "@/components/ui/button";
import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogInIcon, PlusIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-14">
     <h1 className="text-9xl font-serif font-extrabold ">Hello, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Ronit</span></h1>
     <div className="flex gap-3 p-8">
        <RegisterLink><Button variant={"outline"} className="flex gap-1"><PlusIcon/>Sign up</Button></RegisterLink>
        <LoginLink><Button className="flex gap-1"><LogInIcon/>Log in</Button></LoginLink>
     </div>
    </main>
  );
}
