import { MainNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
}

export const siteLinks: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
};
