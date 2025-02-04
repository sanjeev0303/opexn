import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "lucide-react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "@/components/ui/separator";


export const Navbar = () =>  {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">{/* <CommandMenu /> */}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-[36px] w-[35px] px-0 ">
                <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                  <TwitterIcon />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
