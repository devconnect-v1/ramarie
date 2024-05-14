import { Link } from "@remix-run/react";
import { AlignRight } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOptionalUser } from "~/utils/utils";

import { authLinks, navlinks } from "./navbar";

const side = "right";

export const SheetSide = () => {
  const user = useOptionalUser();
  return (
    <Sheet>
      <SheetTrigger asChild className="flex align-middle cursor-pointer">
        <div className="pr-4">
          <AlignRight className="h-6 w-6 text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side={side} className="w-72 rounded-s-lg lg:hidden">
        <SheetHeader>
          <SheetTitle>
            <div className="font-lobster text-primary text-[32px]">
              Ramarie.
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4 my-4 border-y">
          {navlinks.map((link, index) => (
            <SheetClose
              className="flex justify-center flex-col shadow-none text-start w-full !outline-0 focus-visible:!outline-0"
              key={index}
            >
              <span className="px-4 py-[10px] text-[15px] leading-5 text-muted-foreground font-semibold cursor-pointer rounded-xl hover:text-primary hover:bg-teal-50 w-full !outline-0 focus-visible:!outline-0">
                {link.label}
              </span>
            </SheetClose>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {user ? (
            <SheetClose className="flex flex-col">
              <Link
                to="/notes"
                className="px-4 py-[10px] text-[15px] rounded-2xl border border-primary leading-5 font-semibold cursor-pointer text-primary hover:text-primary-foreground hover:bg-primary w-full"
              >
                {user.email}
              </Link>
            </SheetClose>
          ) : (
            authLinks.map((link, index) => (
              <SheetClose key={index} className="flex flex-col">
                <Link
                  to={link.link}
                  className="px-4 py-[10px] text-[15px] rounded-2xl border border-primary leading-5 font-semibold cursor-pointer text-primary hover:text-primary-foreground hover:bg-primary text-center w-full"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
