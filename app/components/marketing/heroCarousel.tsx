import Autoplay from "embla-carousel-autoplay";
import React from "react";

import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";

const carouselImagesUrls: string[] = [
  "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const carouselImages = carouselImagesUrls.map((url: string, index: number) => ({
  id: index + 1,
  url,
}));

const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );
  return (
    <Carousel
      className="w-full h-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselImages.map((image) => (
          <CarouselItem className="p-0" key={image.id}>
            <div className="relative w-full h-[100vh] overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={`${image.url}`}
                alt={`Slide ${image.id}`}
              />
              <div className="absolute inset-0 bg-black opacity-40" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroCarousel;
