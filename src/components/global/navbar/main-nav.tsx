"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { siteLinks } from "@/config/site-links";
import Image from "next/image";

export const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        {/* <LayoutDashboard className="size-6" /> */}
        <Image src="/images/opexn_logo.png" alt="Main logo" className="h-14 w-auto object-contain" width={30} height={25} />
        {/* <span className="hidden font-bold lg:inline-block">{siteConfig.name}</span> */}
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {siteLinks.mainNav.map(
          (item) =>
            item.href && (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/70",
                  pathname === item.href ? "text-foreground" : "text-foreground/70"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </div>
  );
};
