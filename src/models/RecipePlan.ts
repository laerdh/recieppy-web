import { RecipePlanItem } from "./RecipePlanItem";

export interface RecipePlan {
    weekNumber: number,
    recipes: Array<RecipePlanItem>
}