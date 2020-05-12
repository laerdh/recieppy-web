import { RecipePlanEvent } from "./RecipePlanEvent";

export interface RecipePlan {
    weekNumber: number,
    events: RecipePlanEvent[]
}