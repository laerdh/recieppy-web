import axios, { AxiosRequestConfig } from 'axios'
import { RecipePlan } from '../models/RecipePlan'
import { RecipePlanEvent } from '../models/RecipePlanEvent'

export interface TokenData {
    access_token: string
    refresh_token: string
}

const instance = axios.create()
class ApiService {
    BASE_URL: string = "http://localhost:8000/graphql"

    constructor() {
        instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
            const tokenData: TokenData = JSON.parse(sessionStorage.getItem('oidc.user:http://localhost:8080/auth/realms/ledahl:recieppy-web') ?? '')
            config.headers['Authorization'] = `Bearer ${tokenData.access_token}`
            config.headers['Content-Type'] = 'application/json'
            return config
        })
    }

    fetchRecipePlan = async (weekNumber: number): Promise<RecipePlan> => {
        return new Promise(async (resolve, reject) => {
            const locationId = 1

            const query = `
                query FetchRecipePlan {
                    recipePlan(locationId: ${locationId}, weekNumber: ${weekNumber}) {
                        weekNumber
                        events {
                            date
                            recipe {
                                id
                                title
                                imageUrl
                                site
                                url
                                comment
                                shared
                                createdBy
                                tags {
                                    id
                                    text
                                }
                            }
                        }
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
                        events {
                            date
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
                        }
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
}

const apiService = new ApiService()
Object.freeze(apiService)
export default apiService