import React from "react";
import { RecipeItem } from "../models/RecipeItem";
import { RecipeState, initialState } from "./ApplicationStore";
import { isSameDay } from "date-fns";

export type RecipeAction =
    | { type: 'AddRecipe', recipe: RecipeItem }
    | { type: 'RemoveRecipe', recipeId: number }
    | { type: 'AddRecipeToRecipePlan', recipeId: number, date: string }
    | { type: 'RemoveRecipeFromRecipePlan', recipeId: number }

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
        case 'AddRecipeToRecipePlan':
            const newState = [...state.recipePlan.recipes]
            const recipeItem = state.recipePlan.recipes.find((item) => {
                return item.recipe.id === action.recipeId
            })
            
            let existingItem = state.recipePlan.recipes.find((item) => {
                return isSameDay(action.date, item.date)
            })

            if (existingItem) {
                newState[state.recipePlan.recipes.indexOf(existingItem)].date = recipeItem?.date || action.date
            }

            newState[state.recipePlan.recipes.indexOf(recipeItem!)].date = action.date

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

const RecipeContext = React.createContext(initialState.recipeState);

export const RecipeConsumer = RecipeContext.Consumer;

export const RecipeProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState.recipeState)

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

