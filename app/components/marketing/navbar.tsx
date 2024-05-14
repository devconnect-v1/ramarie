import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import { useOptionalUser } from "~/utils/utils";

import { SheetSide } from "./sheetSide";

export const navlinks = [
  {
    link: "#home",
    label: "Accueil",
  },
  {
    link: "#home",
    label: "À-propos",
  },
  {
    link: "#home",
    label: "Nouveautés",
  },
  {
    link: "#home",
    label: "Contact",
  },
];

export const authLinks = [
  {
    link: "/join",
    label: "Inscription",
  },
  {
    link: "/login",
    label: "Connexion",
  },
];

export const Navbar = () => {
  const user = useOptionalUser();

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition > 56;

  return (
    <header
      className={`z-50 fixed w-full top-0 px-0 lg:px-6 transition-all duration-300 ${isScrolled ? "bg-background" : "lg:top-10"}`}
    >
      <nav className="container p-0 mx-auto bg-background lg:rounded-3xl pr-2 flex justify-between items-center w-full overflow-hidden shadow-sm transition-all duration-300">
        <div
          className={`font-lobster text-primary text-[32px] py-2 pl-6 pr-4 tracking-[-1px] leading-10 cursor-pointer ${isScrolled ? "lg:text-primary lg:bg-primary-foreground" : "lg:text-primary-foreground lg:bg-primary"}`}
        >
          Ramarie.
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {navlinks.map((link, index) => (
            <div className="flex justify-center flex-col" key={index}>
              <span className="px-4 py-[10px] text-[15px] leading-5 text-muted-foreground font-semibold cursor-pointer hover:text-primary">
                {link.label}
              </span>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex justify-center flex-col">
              <Link
                to="/notes"
                className="px-4 py-[10px] text-[15px] rounded-2xl border border-primary leading-5 font-semibold cursor-pointer text-primary hover:text-primary-foreground hover:bg-primary"
              >
                {user.email}
              </Link>
            </div>
          ) : (
            authLinks.map((link, index) => (
              <div key={index} className="flex justify-center flex-col">
                <Link
                  to={link.link}
                  className="px-4 py-[10px] text-[15px] rounded-2xl border border-primary leading-5 font-semibold cursor-pointer text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  {link.label}
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="flex lg:hidden items-center">
          <SheetSide />
        </div>
      </nav>
    </header>
  );
};
