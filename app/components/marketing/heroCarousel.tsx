import Autoplay from "embla-carousel-autoplay";
import React from "react";

import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";

const carouselImagesUrls: string[] = [
  "https://devconnect-v1.github.io/ramarie-assets/hero_carousel_1.webp",
  "https://devconnect-v1.github.io/ramarie-assets/hero_carousel_2.webp",
  "https://devconnect-v1.github.io/ramarie-assets/hero_carousel_3.webp",
  "https://devconnect-v1.github.io/ramarie-assets/hero_carousel_4.webp",
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
