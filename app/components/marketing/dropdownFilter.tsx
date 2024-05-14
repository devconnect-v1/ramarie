"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const DropdownFilter = () => {
  const [showPetitDejeuner, setShowPetitDejeuner] =
    React.useState<Checked>(false);
  const [showDejeuner, setShowDejeuner] = React.useState<Checked>(false);
  const [showDiner, setShowDiner] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 border-r-0 border-y-0 border-l border-border hover:border-none rounded-none hover:rounded-sm cursor-pointer text-muted-foreground hover:bg-muted"
          variant="outline"
        >
          <span>Repas</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          Les types de Repas
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showPetitDejeuner}
          onCheckedChange={setShowPetitDejeuner}
        >
          Petit déjeuner
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showDejeuner}
          onCheckedChange={setShowDejeuner}
        >
          Déjeuner
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showDiner}
          onCheckedChange={setShowDiner}
        >
          Dîner
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
