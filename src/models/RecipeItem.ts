import { Tag } from "./Tag";

export interface RecipeItem {
    id: string
    title: string
    imageUrl?: string
    site?: string
    url: string
    comment?: string
    shared: boolean
    created: string
    createdBy: string
    tags: Tag[]
}