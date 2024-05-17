import PopularCarousel from "./popularCarousel";
import TitleSection from "./titleSection";

const title = "Les repas populaires";
const subtitle = "Nouveauté";

export const Popular = () => {
  return (
    <section className="py-20">
      <div className="flex flex-col gap-10">
        <div className="container">
          <TitleSection subtitle={subtitle} title={title} />
        </div>
        <div className="w-full flex justify-center px-4">
          <PopularCarousel />
        </div>
      </div>
    </section>
  );
};
