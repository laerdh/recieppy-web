import { Tag } from "./Tag";

export interface Recipe {
    id: number
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