import Image from "next/image";
import OSSLogo from "@/public/OSSLogo.png";
import CTCLogo from "@/public/CTCLogo.jpg";
import DextroLogo from "@/public/DextroLogo.png";
import JournapLogo from "@/public/Journaplogo.png";
import S1CSLogo from "@/public/S1CSLogo.jpg";
import { Button } from "@/components/ui/button";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-xl font-semibold leading-7">
        Trusted by the best Communities and Startups
      </h2>
      <div className="mt-10 flex flex-wrap lg:grid max-w-lg lg:grid-cols-5 mx-auto items-center gap-x-4 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
        <Button className="p-6 w-[150] h-[100px] md:w-[200px] md:h-[200px] group flex flex-col" variant="outline" >
        <Image
          src={CTCLogo}
          alt=" ClubToCode Logo"
          className="col-span-2  mt-4 md:mt-8 max-h-12 w-full object-contain lg:col-span-1"
          width={1000}
          height={1000}
        />
        <p className="opacity-0 mt-1 md:mt-5 group-hover:opacity-100">Club To Code</p>
        </Button>
        <Button className="p-10 w-[150] h-[100px] md:w-[200px] md:h-[200px] group flex flex-col" variant="outline">
        <Image
          src={S1CSLogo}
          alt="S1CS Logo"
          className="col-span-2  mt-4 md:mt-8 max-h-12 w-full object-contain lg:col-span-1"
          width={1000}
          height={1000}
        />
        <p className="opacity-0 mt-1 md:mt-5 group-hover:opacity-100">Step 1 Creative Studio</p>
        </Button>
        <Button className="p-10 w-[150] h-[100px] md:w-[200px] md:h-[200px] group flex flex-col" variant="outline">
        <Image
          src={OSSLogo}
          alt="OSS Logo"
          className="col-span-2  mt-4 md:mt-8 max-h-12 w-full object-contain lg:col-span-1"
          width={1000}
          height={1000}
        />
        <p className="opacity-0 mt-1 md:mt-5 group-hover:opacity-100">Open Sourceres Society</p>
        </Button>
        <Button className="p-10 w-[150] h-[100px] md:w-[200px] md:h-[200px] group flex flex-col" variant="outline">
        <Image
          src={DextroLogo}
          alt="Dextro Logo"
          className="col-span-2  mt-4 md:mt-8 max-h-12 w-full object-contain lg:col-span-1"
          width={1000}
          height={1000}
        />
        <p className="opacity-0 mt-1 md:mt-5 group-hover:opacity-100">Dextro</p>
        </Button>
        <Button className="p-10 w-[150] h-[100px] md:w-[200px] md:h-[200px] group flex flex-col" variant="outline">
        <Image
          src={JournapLogo}
          alt="Journap Logo"
          className="col-span-2  mt-4 md:mt-8 max-h-12 w-full object-contain lg:col-span-1"
          width={1000}
          height={1000}
        />
        <p className="opacity-0 mt-1 md:mt-5 group-hover:opacity-100">Journap</p>
        </Button>
      </div>
    </div>
  );
}