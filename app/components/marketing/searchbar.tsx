import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { DropdownFilter } from "./dropdownFilter";

const Searchbar = () => {
  return (
    <div className="relative flex w-full md:w-[646px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        className="w-full border-none bg-background py-0 pl-10 pr-4 text-sm font-medium transition-colors focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        placeholder="Rechercher..."
        type="search"
      />
      <DropdownFilter />
    </div>
  );
};

export default Searchbar;
