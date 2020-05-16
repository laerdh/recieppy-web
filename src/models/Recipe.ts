import { Tag } from "./Tag";

export interface Recipe {
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