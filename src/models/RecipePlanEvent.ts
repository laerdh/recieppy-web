import { Recipe } from "./Recipe";

export interface RecipePlanEvent {
    date: string
    recipe: Recipe
}