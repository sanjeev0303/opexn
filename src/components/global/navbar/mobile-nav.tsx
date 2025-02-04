"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { siteLinks } from "@/config/site-links";
import { cn } from "@/lib/utils";
// import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Image from "next/image";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  // const { setMetaColor, metaColor } = useMetaColor()

  // const onOpenChange = React.useCallback(
  //   (open: boolean) => {
  //     setOpen(open)
  //     setMetaColor(open ? "#09090b" : metaColor)
  //   },
  //   [setMetaColor, metaColor]
  // )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="!size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <Image src="/images/opexn_logo.png" alt="Main logo" className="h-14 w-auto object-contain md:hidden" width={30} height={25} />
      <DrawerContent className="max-h-[60svh] p-0">
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {siteLinks.mainNav.map(
              (item) =>
                item.href && (
                  <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
