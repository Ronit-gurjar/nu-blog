import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-14">
     <h1 className="text-9xl font-serif font-extrabold ">Hello, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Ronit</span></h1>
     <Button>Sign in</Button>
    </main>
  );
}
