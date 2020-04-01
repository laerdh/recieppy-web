import React, { useState, useEffect, useCallback } from 'react';
import './WeekPlan.css';
import CircleView from '../circleview/CircleView';
import Recipe from '../recipe/Recipe';
import EmptyItem from '../emptyitem/EmptyItem';
import { format, isSameDay, getISOWeek, addWeeks, subWeeks, getDay, eachDay, startOfWeek, endOfWeek } from 'date-fns';
import Spinner from '../spinner/Spinner';
import { RecipePlan } from '../../models/RecipePlan';
import { RecipePlanItem } from '../../models/RecipePlanItem';
import { RecipeAction } from '../../providers/RecipeProvider';

const nbLocale = require('date-fns/locale/nb')
const KEY_SELECTED_ITEM_ID = 'selectedItemIndex'

type WeekPlanProps = {
    recipePlan?: RecipePlan
    dispatch: React.Dispatch<RecipeAction>
}

const WeekPlan = (props: WeekPlanProps) => {
    const theme = [
        'rgb(232, 101, 100)',
        'rgb(132, 202, 220)',
        'rgb(237, 209, 39',
        'rgb(232, 101, 100',
        'rgb(132, 202, 220)',
        'rgb(232, 101, 100)',
        'rgb(132, 202, 220)',
    ]   

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isLoading, setLoading] = useState(false)

    const handleKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            case 37:
            setSelectedDate(subWeeks(selectedDate, 1))
                return true
            case 39:
            setSelectedDate(addWeeks(selectedDate, 1))
                return true
            default:
                break
        }
    }, [selectedDate])

    useEffect(() => {        
        // TODO: Do GraphQL query

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedDate, handleKeyDown])

    function previousWeek() {
        setSelectedDate(subWeeks(selectedDate, 1))
    }
    
    function nextWeek() {
        setSelectedDate(addWeeks(selectedDate, 1))
    }

    function getLocalizedDayName(date: Date) {
        var weekDayName = format(date, 'dddd', { locale: nbLocale })
        weekDayName = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1, 3)
        return weekDayName
    }

    function getRecipe(item?: RecipePlanItem) {
        if (item) {
            const recipe = item?.recipe

            return (
                <Recipe
                    onDragStart={(event: React.DragEvent) => onDragStart(event, recipe.id)}
                    title={recipe.title}
                    description={recipe.description}
                    tags={recipe.tags}
                />
            )
        }

        return <EmptyItem />
    }

    function onDragStart(event: React.DragEvent, selectedItemId: number) {
        event.dataTransfer.setData(KEY_SELECTED_ITEM_ID, selectedItemId.toString())
    }

    function onDragOver(event: React.DragEvent) {
        event.preventDefault()
    }

    function onDrop(event: React.DragEvent, date: Date) {
        let formattedDate = format(date, 'YYYY-MM-DD')
        let selectedItemId = parseInt(event.dataTransfer.getData(KEY_SELECTED_ITEM_ID))
 
        props.dispatch({ type:'AddRecipeToRecipePlan', recipeId: selectedItemId, date: formattedDate})
    }

    function updateRecipePlan(item: RecipePlanItem) {
        // TODO: Do GraphQL mutation
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="recipeplan-container">
            <div className="recipeplan-header">
                <div className="recipeplan-selector" onClick={() => previousWeek()}>
                    <svg fill={theme[1]} width="24" height="24" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"/>
                    </svg>
                </div>
                <div className="recipeplan-current">Uke {getISOWeek(selectedDate)}</div>        
                <div className="recipeplan-selector" onClick={() => nextWeek()}>
                    <svg fill={theme[1]} width="24" height="24" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/>
                    </svg>
                </div>
            </div>
            {
                eachDay(startOfWeek(selectedDate, { weekStartsOn: 1 }), endOfWeek(selectedDate, { weekStartsOn: 1 })).map((date, index) => {
                    let recipePlanItem = props.recipePlan?.recipes.find((item) => {
                        return isSameDay(date, item.date)
                    })

                    let weekDayName = getLocalizedDayName(date)
                    let isLastElement = getDay(date) === 0

                    return (
                        <div className="container" key={index}>
                            <CircleView
                                isLastElement={isLastElement}
                                title={weekDayName}
                                theme={theme[index]}
                            />
                            <div className="item-container"
                                onDragOver={(e) => onDragOver(e)}
                                onDrop={(e) => onDrop(e, date)}>
                                {getRecipe(recipePlanItem)}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WeekPlan