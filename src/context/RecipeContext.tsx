import React from "react";
import { RecipePlan } from "../models/RecipePlan";
import apiService from "../services/ApiService";
import { getISOWeek } from "date-fns";
import { Recipe } from "../models/Recipe";
import { RecipePlanEvent } from "../models/RecipePlanEvent";

export type RecipeAction =
    | { type: 'SetRecipePlanLoading', isLoading: boolean }
    | { type: 'SetRecipeItemsLoading', isLoading: boolean }
    | { type: 'SetRecipePlan', recipePlan: RecipePlan }
    | { type: 'SetRecipeItems', recipes: Recipe[] }

export interface RecipeItemsState {
    isLoading: boolean
    recipeItems: Recipe[]
}

export interface RecipePlanState {
    isLoading: boolean
    recipePlan: RecipePlan
}

export interface RecipeState {
    recipePlan: RecipePlanState
    recipes: RecipeItemsState
    fetchRecipePlan: (weekNumber: number) => void
    updateRecipePlan: (itemIndex: number, date: string) => void
    fetchRecipes: () => void
    addRecipe: (recipeId: number, date: string) => void
    removeRecipe: (recipeId: number, date: string) => void
}

const initialState: RecipeState = {
    recipePlan: {
        isLoading: true,
        recipePlan: {
            weekNumber: getISOWeek(new Date()),
            events: []
        }
    },
    recipes: {
        isLoading: false,
        recipeItems: [] 
    },
    fetchRecipePlan: () => {},
    updateRecipePlan: () => {},
    fetchRecipes: () => {},
    addRecipe: () => {},
    removeRecipe: () => {}
};

function reducer(state: RecipeState, action: RecipeAction): RecipeState {
    switch (action.type) {
        case 'SetRecipePlanLoading':
            return {
                ...state,
                recipePlan: {
                    isLoading: action.isLoading,
                    ...state.recipePlan
                }
            }
        case 'SetRecipeItemsLoading':
            return {
                ...state,
                recipes: {
                    isLoading: action.isLoading,
                    ...state.recipes
                }
            }
        case 'SetRecipePlan':
            return {
                ...state,
                recipePlan: {
                    isLoading: false,
                    recipePlan: action.recipePlan
                }
            }
        case 'SetRecipeItems':
            return {
                ...state,
                recipes: {
                    isLoading: false,
                    recipeItems: action.recipes
                }
            }
        default:
            throw Error("Action not defined")
    }
}

export const RecipeContext = React.createContext(initialState);

export const RecipeConsumer = RecipeContext.Consumer;

export const RecipeProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const fetchRecipePlan = (weekNumber: number) => {
        dispatch({ type: 'SetRecipePlanLoading', isLoading: true })
        
        apiService.fetchRecipePlan(weekNumber).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan: recipePlan})
        })
        .catch(error => {
            console.log('Failed to load recipe plan', error)
            dispatch({ type: 'SetRecipePlanLoading', isLoading: false })
        })
    }

    const updateRecipePlan = (itemIndex: number, newDate: string) => {
        const recipePlanEvent = state.recipePlan.recipePlan.events[itemIndex]

        apiService.updateRecipePlan(recipePlanEvent, newDate).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan })
        })
        .catch(error => {
            console.log('Failed to update recipe plan', error)
        })
    }

    const fetchRecipes = () => {
        dispatch({ type: 'SetRecipeItemsLoading', isLoading: true })

        apiService.fetchRecipes(1).then(recipes => {
            dispatch({ type: 'SetRecipeItems', recipes: recipes })
        })
        .catch(error => {
            console.log('Failed to fetch recipes', error)
            dispatch({ type: 'SetRecipeItemsLoading', isLoading: false })
        })
    }

    const addRecipe = (recipeId: number, date: string) => {
        dispatch({ type: 'SetRecipePlanLoading', isLoading: true })

        const recipe = state.recipes.recipeItems.find(item => item.id === recipeId)
        
        if (recipe == undefined) {
            return
        }

        const newRecipePlanEvent: RecipePlanEvent = { date: date, recipe: recipe!!}

        apiService.addRecipeToRecipePlan(newRecipePlanEvent).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan: recipePlan })
        })
        .catch(error => {
            console.log('Failed to add recipe event', error)
            dispatch({ type: 'SetRecipePlanLoading', isLoading: false })
        })
    }

    const removeRecipe = (recipeId: number, date: string) => {
        dispatch({ type: 'SetRecipePlanLoading', isLoading: true })

        apiService.removeRecipe(recipeId, date).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan: recipePlan })
        }).catch(error => {
            console.log('Failed to remove recipe event', error)
            dispatch({ type: 'SetRecipePlanLoading', isLoading: false })
        })
    }

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                fetchRecipePlan,
                updateRecipePlan,
                fetchRecipes,
                addRecipe,
                removeRecipe
            }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

