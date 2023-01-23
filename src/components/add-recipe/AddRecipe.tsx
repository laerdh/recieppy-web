import React, { useEffect, useState } from 'react'
import styles from './AddRecipe.module.css'
import Spinner from '../spinner/Spinner'
import { RecipeItemsState } from '../../context/RecipeContext'
import CardView, { CardViewType } from '../card/CardView'
import SearchBar from '../searchbar/SearchBar'
import { Recipe } from '../../models/Recipe'

export interface AddRecipeProps {
    state: RecipeItemsState

    fetchRecipes: () => void
    addRecipe: (recipeId: number) => void
}

const AddRecipe = ({ state, fetchRecipes, addRecipe }: AddRecipeProps) => {
    const [isFiltering, setIsFiltering] = useState(false)
    const [filteredRecipeItems, setFilteredRecipeItems] = useState<Recipe[]>([])
    
    useEffect(() => {
        if (state.recipeItems.length === 0 && !state.isLoading) {
            fetchRecipes()
        }

        if (!isFiltering && state.recipeItems.length > 0) {
            setFilteredRecipeItems(state.recipeItems)
        }
    })

    function filterRecipeItems(query: string) {
        if (query.length === 0) {
            setFilteredRecipeItems(state.recipeItems)
            setIsFiltering(false)
        } else {
            setIsFiltering(true)
            
            const filteredList = state.recipeItems.filter(item => {
                const titleString = item.title.toLowerCase()
                const queryString = query.toLowerCase().trim()
                return titleString.includes(queryString)
            })

            setFilteredRecipeItems(filteredList)
        }
    }

    return (
        <div className={styles.pageContainer}>
            <h2 id={styles.title}>Legg til oppskrift</h2>
            <div className="divider" style={{ margin: '8px 0 16px 0'}}></div>
            <SearchBar onInputChanged={filterRecipeItems} />
            <div className={styles.recipeContainer}>
                {
                    state.isLoading ?
                        <Spinner />
                        :
                        filteredRecipeItems.map(recipe => {
                            return (
                                <CardView key={recipe.id} type={CardViewType.Small} imageUrl={recipe.imageUrl} onClick={() => { addRecipe(recipe.id) }}>
                                    <h3 className={styles.cardTitle}>{recipe.title}</h3>
                                    <p className={styles.cardCreatedBy}>{recipe.createdBy}</p>
                                </CardView>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default AddRecipe