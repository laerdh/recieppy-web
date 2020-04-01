import React from 'react';
import WeekPlan from '../weekplan/WeekPlan';
import { RecipeProvider, RecipeConsumer } from '../../providers/RecipeProvider';

export const Dashboard = (props: any) => {
    return (
      <RecipeProvider>
        <RecipeConsumer>
          { recipeState => (
              <WeekPlan recipePlan={recipeState.recipePlan} dispatch={recipeState.dispatch} />
          )}
        </RecipeConsumer>
      </RecipeProvider>
    )
}