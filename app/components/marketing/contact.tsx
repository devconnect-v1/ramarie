import { LucideSend } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import TitleSection from "./titleSection";

const title = "Contact";
const subtitle = "Contactez nous";

const cardTitle = "Envoyer-nous des retours";
const cardDetails =
  "Vous avez des questions ou des suggestions ? Nous sommes là pour vous aider ! Contactez-nous pour toute demande concernant Ramarie, que ce soit des idées de recettes, des problèmes techniques ou des améliorations. Votre avis nous intéresse et nous aide à améliorer votre expérience culinaire avec Ramarie. Rejoignez-nous et partagez vos impressions !";

const contactInfo: {
  label: string;
  value: string;
}[] = [
  {
    label: "Téléphone",
    value: "069 69 699 69",
  },
  {
    label: "Local",
    value: "Antananarivo",
  },
  {
    label: "Email",
    value: "ramarie@gmail.com",
  },
];

export const Contact = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="flex flex-col gap-10">
          <TitleSection
            subtitle={subtitle}
            title={title}
            whiteTitle
            whiteSubtitle
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 rounded-3xl bg-card">
            <div className="flex flex-col gap-6">
              <h4 className="text-card-foreground font-semibold text-2xl">
                {cardTitle}
              </h4>
              <p className="text-muted-foreground">{cardDetails}</p>
              <div>
                {contactInfo.map((info, index) => (
                  <div className="flex justify-between items-center border-b-[1px] border-border py-2 last:border-0" key={index}>
                    <span>{info.label}</span>
                    <span>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <form action="#" className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input type="text" placeholder="Nom" />
                    <Input type="text" placeholder="Prénom(s)" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input type="email" placeholder="Email" />
                    <Input type="text" placeholder="Objet" />
                  </div>
                  <Textarea placeholder="Votre message" />
                </div>
                <Button size="lg" className="rounded-2xl">
                  Envoyer{" "}
                  <LucideSend className="ml-2 h-4 w-4 relative top-[1px]" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
