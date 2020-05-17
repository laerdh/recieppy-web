import React, { useEffect } from 'react'
import styles from './AddRecipe.module.css'
import Spinner from '../spinner/Spinner'
import { RecipeItemsState } from '../../context/RecipeContext'
import CardView, { CardViewType } from '../card/CardView'
import SearchBar from '../searchbar/SearchBar'

export interface AddRecipeProps {
    state: RecipeItemsState

    fetchRecipes: () => void
    addRecipe: (recipeId: number) => void
}

const AddRecipe = ({ state, fetchRecipes, addRecipe }: AddRecipeProps) => {

    useEffect(() => {
        if (state.items.length === 0 && !state.isLoading) {
            fetchRecipes()
        }
    })

    return (
        <div className={styles.pageContainer}>
            <h2 id={styles.title}>Legg til oppskrift</h2>
            <div className="divider" style={{ margin: '8px 0 16px 0'}}></div>
            <SearchBar />
            <div className={styles.recipeContainer}>
                {
                    state.isLoading ?
                        <Spinner />
                        :
                        state.items.map(recipe => {
                            return (
                                <CardView key={recipe.id} type={CardViewType.Small} imageUrl={recipe.imageUrl} onClick={() => { addRecipe(Number(recipe.id)) }}>
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