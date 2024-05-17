import Autoplay from "embla-carousel-autoplay";
import { LucideArrowUpRight } from "lucide-react";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const recipes: { name: string; tags: string[]; imgUrl: string }[] = [
  {
    name: "Ravitoto sy henakisoa",
    tags: ["Déjeuner", "Dîner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_1.jpg",
  },
  {
    name: "Mofo gasy",
    tags: ["Petit déjeuner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_2.jpg",
  },
  {
    name: "Anamamy sy henakisoa",
    tags: ["Déjeuner", "Dîner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_3.jpg",
  },
  {
    name: "Romazava",
    tags: ["Déjeuner", "Dîner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_4.jpg",
  },
  {
    name: "Koba",
    tags: ["Dessert"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_5.jpg",
  },
  {
    name: "Lasary voatabia",
    tags: ["Déjeuner", "Dîner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_6.jpg",
  },
  {
    name: "Sesika",
    tags: ["Déjeuner", "Dîner"],
    imgUrl:
      "https://devconnect-v1.github.io/ramarie-assets/popular_carousel_7.jpg",
  },
];

const PopularCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        {recipes.map((recipe, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="group relative w-full rounded-lg overflow-hidden">
              <img className="w-full transform transition duration-500 scale-100 hover:scale-105" src={recipe.imgUrl} alt={recipe.name} />
              <div className="absolute -bottom-4 left-4 right-4 w-[100% - 24px] opacity-0 cursor-pointer ease-in-out duration-300 group-hover:opacity-100 group-hover:bottom-4">
                <div className="bg-[rgba(255,255,255,0.9)] backdrop-blur-sm flex justify-between items-center px-6 py-4 rounded-[8px] hover:bg-background ease-in-out duration-300">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-card-foreground text-[18px] font-semibold">
                      {recipe.name}
                    </h4>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      {recipe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 after:content-['|'] last:after:content-['']"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                  <LucideArrowUpRight className="text-muted-foreground" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PopularCarousel;
