import HeroCarousel from "./heroCarousel";
import Searchbar from "./searchbar";

export const Hero = () => {
  const logo : {
    name: string,
    url: string
  } = {
    name: 'logo',
    url: '/images/logo.png'
  }
  return (
    <div className="relative w-full h-full">
      <HeroCarousel />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-center">
        <img src={logo.url} alt="logo" className="w-40" />
        <div className="flex flex-col items-center justify-center gap-6 text-white">
          <h2 className="text-4xl md:text-5xl font-lobster max-w-[855px]">Hi Ramarie.</h2>
          <p className="text-lg md:text-xl">Petit déjeuner - Déjeuner - Dîner</p>
        </div>
        <div className="flex py-3 px-4 bg-background rounded-lg">
          <Searchbar />
        </div>
      </div>
    </div>
  );
};
