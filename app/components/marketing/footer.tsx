import { Link } from "@remix-run/react";
import { LucideChevronRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { navlinks } from "./navbar";

const title = "Rester en contact";
const description =
  "Merci d'avoir vister notre site web, n'oubliez pas de nous suivre sur les reseaux sociaux pour plus de d'actu!";

const socialMedias: {
  name: string;
  icon: JSX.Element;
}[] = [
  {
    name: "Facebook",
    icon: <FaFacebookF className="h-4 w-4" />,
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="h-4 w-4" />,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="h-4 w-4" />,
  },
  {
    name: "Tiktok",
    icon: <FaTiktok className="h-4 w-4" />,
  },
  {
    name: "Youtube",
    icon: <FaYoutube className="h-4 w-4" />,
  },
];

export const Footer = () => {
  const logo: {
    name: string;
    url: string;
  } = {
    name: "logo",
    url: "/images/logo.png",
  };
  return (
    <section className="py-10">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="uppercase text-2xl font-light tracking-[1px]">
            {title}
          </h3>
          <p className="text-muted-foreground text-center md:text-start">
            {description}
          </p>
          <div className="flex items-center gap-2">
            {socialMedias.map((socialMedia, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="rounded-full text-primary hover:bg-primary hover:text-background border-primary hover:border-none"
              >
                {socialMedia.icon}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={logo.url} alt="logo" className="w-20" />
          <div className="font-lobster text-primary text-[32px] tracking-[-1px] leading-10">
            Ramarie.
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-4">
            {navlinks.map((link, index) => (
              <Link
                to={link.link}
                key={index}
                className="flex items-center gap-1 font-light text-sm text-secondary-foreground"
              >
                <LucideChevronRight className="h-3 w-3" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
