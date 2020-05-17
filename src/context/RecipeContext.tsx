import React from "react";
import { RecipePlan } from "../models/RecipePlan";
import apiService from "../services/ApiService";
import { getISOWeek } from "date-fns";
import { Recipe } from "../models/Recipe";
import { RecipePlanEvent } from "../models/RecipePlanEvent";

export type RecipeAction =
    | { type: 'SetLoading', isLoading: boolean }
    | { type: 'SetRecipePlan', recipePlan: RecipePlan }
    | { type: 'SetRecipeItems', isLoading: boolean, recipes: Recipe[] }

export interface RecipeItemsState {
    isLoading: boolean
    items: Recipe[]
}

export interface RecipeState {
    isLoading: boolean
    recipePlan: RecipePlan
    recipes: RecipeItemsState
    fetchRecipePlan: (weekNumber: number) => void
    updateRecipePlan: (itemIndex: number, date: string) => void
    fetchRecipes: () => void
    addRecipe: (recipeId: number, date: string) => void
}

const initialState: RecipeState = {
    isLoading: true,
    recipePlan: {
        weekNumber: getISOWeek(new Date()),
        events: []
    },
    recipes: {
        isLoading: false,
        items: [] 
    },
    fetchRecipePlan: () => {},
    updateRecipePlan: () => {},
    fetchRecipes: () => {},
    addRecipe: () => {}
};

function reducer(state: RecipeState, action: RecipeAction): RecipeState {
    switch (action.type) {
        case 'SetLoading':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'SetRecipePlan':
            return {
                ...state,
                isLoading: false,
                recipePlan: action.recipePlan,
                recipes: {
                    ...state.recipes,
                    isLoading: false
                }
            }
        case 'SetRecipeItems':
            return {
                ...state,
                recipes: {
                    isLoading: action.isLoading,
                    items: action.recipes
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
        dispatch({ type: 'SetLoading', isLoading: true })
        
        apiService.fetchRecipePlan(weekNumber).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan: recipePlan})
        })
        .catch(error => {
            console.log('Failed to load recipe plan', error)
            dispatch({ type: 'SetLoading', isLoading: false })
        })
    }

    const updateRecipePlan = (itemIndex: number, newDate: string) => {
        const recipePlanEvent = state.recipePlan.events[itemIndex]

        apiService.updateRecipePlan(recipePlanEvent, newDate).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan })
        })
        .catch(error => {
            console.log('Failed to update recipe plan', error)
        })
    }

    const fetchRecipes = () => {
        dispatch({ type: 'SetRecipeItems', isLoading: true, recipes: [] })

        apiService.fetchRecipes(1).then(recipes => {
            console.log('Fetched recipes', recipes)
            dispatch({ type: 'SetRecipeItems', isLoading: false, recipes: recipes })
        })
        .catch(error => {
            console.log('Failed to fetch recipes', error)
        })
    }

    const addRecipe = (recipeId: number, date: string) => {
        dispatch({ type: 'SetRecipeItems', isLoading: true, recipes: [...state.recipes.items] })

        const recipe = state.recipes.items.find(item => item.id === String(recipeId))
        const newRecipePlanEvent: RecipePlanEvent = { date: date, recipe: recipe!!}

        apiService.addRecipeToRecipePlan(newRecipePlanEvent).then(recipePlan => {
            dispatch({ type: 'SetRecipePlan', recipePlan: recipePlan })
        })
        .catch(error => {
            console.log('Failed to add recipe event', error)
        })
    }

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                fetchRecipePlan,
                updateRecipePlan,
                fetchRecipes,
                addRecipe
            }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

