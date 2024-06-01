import { prisma } from "~/utils/db.server";

export function getRecipeListItems() {
  return prisma.recipe.findMany({
    select: { id: true, title: true }
  });
}
