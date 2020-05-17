import React from 'react'
import WeekPlan from '../weekplan/WeekPlan'
import { RecipeProvider, RecipeConsumer } from '../../context/RecipeContext'

export const Dashboard = (props: any) => {
    return (
      <RecipeProvider>
        <RecipeConsumer>
          { state => (
            <WeekPlan
              state={state.recipePlan}
              fetchRecipePlan={state.fetchRecipePlan}
              updateRecipePlan={state.updateRecipePlan}
              addRecipe={state.addRecipe}
              />
          )}
        </RecipeConsumer>
      </RecipeProvider>
    )
}