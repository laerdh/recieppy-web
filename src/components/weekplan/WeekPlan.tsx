import React, { useState, useEffect, useCallback } from 'react';
import './WeekPlan.css';
import CircleView from '../circleview/CircleView';
import Recipe from '../recipe/Recipe';
import EmptyItem from '../emptyitem/EmptyItem';
import { format, isSameDay, getISOWeek, addWeeks, subWeeks, getDay, eachDay, startOfWeek, endOfWeek } from 'date-fns';
import { RecipePlan } from '../../models/RecipePlan';
import { RecipePlanEvent } from '../../models/RecipePlanEvent';

const nbLocale = require('date-fns/locale/nb')
const KEY_SELECTED_ITEM_INDEX = 'selectedItemIndex'

type WeekPlanProps = {
    isLoading: boolean,
    recipePlan: RecipePlan,
    fetchRecipePlan: (weekNumber: number) => void,
    updateRecipePlan: (itemIndex: number, date: string) => void
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
        props.fetchRecipePlan(getISOWeek(selectedDate))

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

    function getRecipePlanEvent(item?: RecipePlanEvent) {
        if (item) {
            const recipe = item.recipe

            return (
                <Recipe
                    onDragStart={(event: React.DragEvent) => onDragStart(event, props.recipePlan.events.indexOf(item))}
                    title={recipe.title}
                    comment={recipe.comment}
                    tags={recipe.tags}
                />
            )
        }

        return <EmptyItem />
    }

    function onDragStart(event: React.DragEvent, selectedItemIndex: number) {
        event.dataTransfer.setData(KEY_SELECTED_ITEM_INDEX, selectedItemIndex.toString())
    }

    function onDragOver(event: React.DragEvent) {
        event.preventDefault()
    }

    function onDrop(event: React.DragEvent, date: Date) {
        let formattedDate = format(date, 'YYYY-MM-DD')
        let selectedItemIndex = parseInt(event.dataTransfer.getData(KEY_SELECTED_ITEM_INDEX))
        props.updateRecipePlan(selectedItemIndex, formattedDate)
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
                    let recipePlanEvent = props.recipePlan.events.find((item) => {
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
                                {getRecipePlanEvent(recipePlanEvent)}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WeekPlan