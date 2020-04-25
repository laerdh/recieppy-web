import React from "react";
import { RecipeItem } from "../models/RecipeItem";
import { RecipePlan } from "../models/RecipePlan";

export type RecipeAction =
    | { type: 'AddRecipe', recipe: RecipeItem }
    | { type: 'RemoveRecipe', recipeId: number }
    | { type: 'UpdateRecipePlan', week: number, recipeId: number, date: string }
    | { type: 'RemoveRecipeFromRecipePlan', recipeId: number }

export interface RecipeState {
    recipes: RecipeItem[]
    recipePlan: RecipePlan
    dispatch: React.Dispatch<RecipeAction>
}

const initialState: RecipeState = {
    recipes: [],
    recipePlan: {
        weekNumber: 1,
        recipes: [
            {
                date: '2020-03-11',
                recipe: {
                    id: 1,
                    title: 'Kjøttkaker',
                    description: 'Heihei',
                    tags: ['Kjøtt']
                }
            },
            {
                date: '2020-03-12',
                recipe: {
                    id: 2,
                    title: 'Fiskeboller',
                    description: 'Mhmm',
                    tags: ['Fisk']
                }
            }
        ]
        },
    dispatch: () => {}
}

function reducer(state: RecipeState, action: RecipeAction): RecipeState {
    switch (action.type) {
        case 'AddRecipe':
            return {
                ...state,
                recipes: [...state.recipes, action.recipe]
            }
        case 'RemoveRecipe':
            return {
                ...state,
                recipes: [...state.recipes.filter((item) => item.id !== action.recipeId)]
            }
        case 'UpdateRecipePlan':
            const itemToUpdateIndex = state.recipePlan.recipes.findIndex(item => item.recipe.id === action.recipeId)
            const existingItemIndex = state.recipePlan.recipes.findIndex(item => item.date === action.date)

            const newState = [...state.recipePlan.recipes]

            if (existingItemIndex != -1) {
                newState[existingItemIndex].date = newState[itemToUpdateIndex].date
            }

            newState[itemToUpdateIndex].date = action.date

            return {
                ...state,
                recipePlan: {
                    weekNumber: state.recipePlan.weekNumber,
                    recipes: newState
                }
            }
        case 'RemoveRecipeFromRecipePlan':
            console.log('Remove recipe from recipe plan action')
            return state
        default:
            throw Error("Action not defined")
    }
}

const RecipeContext = React.createContext(initialState);

export const RecipeConsumer = RecipeContext.Consumer;

export const RecipeProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                dispatch
            }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

