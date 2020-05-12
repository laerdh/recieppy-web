import React from "react";
import { RecipePlan } from "../models/RecipePlan";
import apiService from "../services/ApiService";
import { getISOWeek } from "date-fns";

export type RecipeAction =
    | { type: 'SetLoading', isLoading: boolean }
    | { type: 'SetRecipePlan', recipePlan: RecipePlan }
    | { type: 'UpdateRecipePlan', recipeId: string, date: string }
    | { type: 'RemoveRecipeFromRecipePlan', recipeId: string }

export interface RecipeState {
    isLoading: boolean
    recipePlan: RecipePlan
    fetchRecipePlan: (weekNumber: number) => void
    updateRecipePlan: (itemIndex: number, date: string) => void
}

const initialState: RecipeState = {
    isLoading: true,
    recipePlan: {
        weekNumber: getISOWeek(new Date()),
        events: []
    },
    fetchRecipePlan: () => {},
    updateRecipePlan: () => {}
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
                recipePlan: action.recipePlan
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

    return (
        <RecipeContext.Provider
            value={{
                ...state,
                fetchRecipePlan,
                updateRecipePlan
            }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

