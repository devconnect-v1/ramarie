import { Link } from "@remix-run/react";
import { LucideChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOptionalUser } from "~/utils/utils";

import TitleSection from "./titleSection";

const title = "Ramarie";
const subtitle = "à propos";

const description =
  "Ramarie est votre assistant culinaire personnel dédié à la création de repas savoureux et adaptés à vos besoins. Que vous aimiez la cuisine italienne, française, asiatique ou méditerranéenne, Ramarie vous propose des suggestions de plats personnalisées. Explorez une multitude de recettes adaptées à vos préférences alimentaires, à vos allergies et à votre budget. Planifiez vos repas pour la semaine, créez des listes de courses automatiques et découvrez de nouvelles saveurs chaque jour. Ramarie simplifie la préparation de repas sains et délicieux, transformant votre expérience culinaire à domicile.";

const aboutPic: {
  src: string;
  alt: string;
} = {
  src: "https://devconnect-v1.github.io/ramarie-assets/about_pic.png",
  alt: "about_pic",
};

export const About = () => {
  const user = useOptionalUser();
  return (
    <section className="py-20 bg-about-bg bg-cover">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-10">
          <TitleSection subtitle={subtitle} title={title} />
          <div className="flex flex-col gap-8">
            <p className="text-foreground">{description}</p>
            <Link to={`${user ? "/notes" : "/login"}`} className="w-min">
              <Button size="lg">
                Acceder à la plateform{" "}
                <LucideChevronRight className="ml-2 h-4 w-4 relative top-[1px]" />
              </Button>
            </Link>
          </div>
        </div>
        <img
          className="max-h-[450px] mx-auto md:ml-auto"
          src={aboutPic.src}
          alt={aboutPic.alt}
        />
      </div>
    </section>
  );
};
