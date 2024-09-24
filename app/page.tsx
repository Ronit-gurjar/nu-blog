import { Button } from "@/components/ui/button";
import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogInIcon, PlusIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Hero } from "./components/landing/Hero";
import { Logos } from "./components/landing/Logos";
import { Features } from "./components/landing/Features";
import { PricingTable } from "./components/shared/Pricing";
import Footer from "./components/landing/Footer";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect("/dashboard");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex flex-col gap-7 px-8">
        <Hero/>
        <Logos/>
        <Features/>
        <PricingTable/>
        <Footer/>
     </div>
    </main>
  );
}
