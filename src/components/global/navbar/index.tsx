import { Separator } from "@/components/ui/separator";
import { NAVIGATIONS } from "@/constants";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="w-full min-h-12">

      <div className="flex px-5 py-3 justify-between">
        <div className="flex mt-2  gap-16 xs:gap-10">
          <div>
            <h1>Logo</h1>
          </div>
          <div className="flex gap-5">
            {NAVIGATIONS.map((navigation) => (
              <Link
                key={navigation.id}
                href={`{navigation.link}`}
                className="hover:underline"
              >
                {navigation.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-5 ">

            <a href={`/www.instagram.com`} className="mt-[7px]">
              <Instagram />
            </a>
         

          <Separator orientation="vertical" />

          <ModeToggle />
        </div>
      </div>

      <Separator orientation="horizontal" className="px-5" />

    </div>
  );
};

export default Navbar;
