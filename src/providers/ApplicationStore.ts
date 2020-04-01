import { RecipePlan } from "../models/RecipePlan";
import { User } from "oidc-client";
import { RecipeItem } from "../models/RecipeItem";
import { RecipeAction } from './RecipeProvider';

export interface ApplicationState {
    authentication: AuthenticationState
    recipeState: RecipeState 
}

export interface RecipeState {
    recipes: RecipeItem[],
    recipePlan: RecipePlan
    dispatch: React.Dispatch<RecipeAction>
}

export interface AuthenticationState {
    user?: User

    signIn(): void
    logout(): void
    isAuthenticated(): boolean
    signInSilentCallback(): void
    signInRedirectCallback(): void
    signOutRedirectCallback(): void
}

export const initialState: ApplicationState = {
    authentication: {
        signIn: () => {},
        logout: () => {},
        isAuthenticated: () => false,
        signInSilentCallback: () => {},
        signInRedirectCallback: () => {},
        signOutRedirectCallback: () => {}

    },
    recipeState: {
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
}