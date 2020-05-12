import { RecipePlanItem } from "./RecipePlanItem";

export interface RecipePlan {
    weekNumber: number,
    events: RecipePlanItem[]
}