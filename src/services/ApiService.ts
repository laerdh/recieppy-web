import axios, { AxiosRequestConfig } from 'axios'
import { RecipePlan } from '../models/RecipePlan'
import { RecipePlanEvent } from '../models/RecipePlanEvent'
import { METADATA_OIDC, CLIENT_ID } from '../config/AuthConst'
import { Recipe } from '../models/Recipe'

export interface TokenData {
    access_token: string
    refresh_token: string
}

const RecipeFragment = `
    recipe {
        id
        title
        imageUrl
        site
        url
        comment
        shared
        created
        createdBy
        tags {
            id
            text
        }
    }
`

const RecipePlanEventFragment = `
    events {
        date
        ${RecipeFragment}
    }
`

const instance = axios.create()
class ApiService {
    BASE_URL: string = "http://localhost:8000/graphql"

    constructor() {
        instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
            const tokenData: TokenData = JSON.parse(sessionStorage.getItem(`oidc.user:${METADATA_OIDC.issuer}:${CLIENT_ID}`) ?? '')
            config.headers['Authorization'] = `Bearer ${tokenData.access_token}`
            config.headers['Content-Type'] = 'application/json'
            return config
        })
    }

    fetchRecipes = async (locationId: number): Promise<Recipe[]> => {
        return new Promise(async (resolve, reject) => {

            const query = `
                query GetRecipes {
                    recipes(locationId: ${locationId}) {
                        id
                        title
                        imageUrl
                        url
                        shared
                        created
                        createdBy
                        tags {
                            id
                            text
                        }
                    }
                }
            `

            try {
                let result = await instance.post(this.BASE_URL, { query })
                const recipes = result.data.data['recipes']
                resolve(recipes)
            } catch (error) {
                reject(error)
            }
        })
    }

    fetchRecipePlan = async (weekNumber: number): Promise<RecipePlan> => {
        return new Promise(async (resolve, reject) => {
            const locationId = 1

            const query = `
                query FetchRecipePlan {
                    recipePlan(locationId: ${locationId}, weekNumber: ${weekNumber}) {
                        weekNumber
                        ${RecipePlanEventFragment}
                    }
                }
            `.replace('\n', '').trim()

            try {
                let result = await instance.post(this.BASE_URL, { query })
                const recipePlan = result.data.data['recipePlan']
                resolve(recipePlan)
            } catch (error) {
                reject(error)
            }
        })
    }

    updateRecipePlan = async (recipePlanEvent: RecipePlanEvent, newDate: string): Promise<RecipePlan> => {
        return new Promise(async (resolve, reject) => {
            const locationId = 1
    
            const query = `
                mutation updateRecipePlanEvent {
                    updateRecipePlanEvent(locationId: ${locationId}, recipePlanEvent: {recipeId: ${recipePlanEvent.recipe.id}, currentDate: "${recipePlanEvent.date}", newDate: "${newDate}"}) {
                        weekNumber
                        ${RecipePlanEventFragment}
                    }
                }
            `.replace('\n', '').trim()
    
            try {
                let result = await instance.post(this.BASE_URL, { query })
                const updatedRecipePlan = result.data.data['updateRecipePlanEvent']
                resolve(updatedRecipePlan)
            } catch (error) {
                reject(error)
            }
        })
    }

    addRecipeToRecipePlan = async (recipePlanEvent: RecipePlanEvent): Promise<RecipePlan> => {
        return new Promise(async (resolve, reject) => {
            const locationId = 1

            const query = `
                mutation NewRecipePlanEvent {
                    newRecipePlanEvent(locationId: ${locationId}, recipePlanEvent: { recipeId: ${recipePlanEvent.recipe.id}, currentDate: "${recipePlanEvent.date}" }) {
                        weekNumber
                        ${RecipePlanEventFragment}
                    }
                }
            `.replace('\n', '').trim()

            try {
                let result = await instance.post(this.BASE_URL, { query })
                const newRecipePlanEvents = result.data.data['newRecipePlanEvent']
                resolve(newRecipePlanEvents)
            } catch (error) {
                reject(error)
            }
        })
    }

    removeRecipe = async (recipeId: number, date: string): Promise<RecipePlan> => {
        return new Promise(async (resolve, reject) => {
            const locationId = 1

            const query = `
                mutation DeleteRecipePlanEvent {
                    deleteRecipePlanEvent(locationId: ${locationId}, recipePlanEvent: { recipeId: ${recipeId}, currentDate: "${date}" }) {
                        weekNumber
                        ${RecipePlanEventFragment}
                    }
                }
            `.replace('\n', '').trim()

            try {
                let result = await instance.post(this.BASE_URL, { query })
                const deleteRecipePlanEvent = result.data.data['deleteRecipePlanEvent']
                resolve(deleteRecipePlanEvent)
            } catch(error) {
                reject(error)
            }
        })
    }
}

const apiService = new ApiService()
Object.freeze(apiService)
export default apiService