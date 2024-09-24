import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg"
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { CopyrightIcon, XIcon, Youtube, YoutubeIcon } from "lucide-react";

export default function Footer(){
    return(
        <div className="relative items-center w-full py-4 mx-auto mt-32 overflow-clip">
            <svg
              className="absolute mt-40 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
    <Card className="mt-36 border-primary relative object-cover w-full shadow-lg">
        <CardHeader>
            <CardTitle>
            <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10" alt="Logo" />
            <h4 className="text-3xl font-semibold">
              <span className="text-primary italic">nu</span>-Blog
            </h4>
          </Link>
        </div>
            </CardTitle>
            <CardDescription>An Open-Source SaaS platform for blog writing.</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col md:flex-row justify-between items-center mt-10">
            <div className="flex gap-2">
            <Button className="p-1 size-10" variant="outline" asChild>
                <Link href={"https://github.com/Ronit-gurjar/nu-blog"}><GitHubLogoIcon className="size-10"/></Link>
            </Button>
            <Button className="p-1 size-10" variant="outline" asChild>
                <Link href={"https://youtu.be/_ypZyGeJox8?si=PFwcSgrXjqjDDjCg"}><Youtube className="size-10"/></Link>
            </Button>
            </div>
            <p className="flex items-center mt-4 text-muted-foreground"><CopyrightIcon className="size-4 mr-3"/>No rights reserved at all</p>
            <Button variant="ghost"><Link href={"https://github.com/Ronit-gurjar"}>Made by <span className="text-primary font-semibold">Ronit</span></Link></Button>
        </CardFooter>
    </Card>
    </div>
    )
}