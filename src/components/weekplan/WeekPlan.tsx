import React, { useState, useEffect, useCallback } from 'react';
import './WeekPlan.css';
import ArrowLeft from '../../assets/images/arrow_left.svg'
import ArrowRight from '../../assets/images/arrow_right.svg'
import EmptyItem from '../emptyitem/EmptyItem';
import { isSameDay, getISOWeek, addWeeks, subWeeks, eachDay, startOfWeek, endOfWeek } from 'date-fns';
import { RecipePlan } from '../../models/RecipePlan';
import { RecipePlanEvent } from '../../models/RecipePlanEvent';
import DraggableCardView from '../card/DraggableCardView';
import { CardViewType } from '../card/CardView';
import { DateUtil } from './DateUtil';
import Modal from '../modal/Modal';
import AddRecipe from '../add-recipe/AddRecipe';
import { RecipeConsumer } from '../../context/RecipeContext';

const KEY_SELECTED_ITEM_INDEX = 'selectedItemIndex'

type WeekPlanProps = {
    isLoading: boolean,
    recipePlan: RecipePlan,
    fetchRecipePlan: (weekNumber: number) => void,
    updateRecipePlan: (itemIndex: number, date: string) => void
    addRecipe: (recipeId: number, date: string) => void
}

interface AddRecipeModalState {
    date: Date
    showModal: boolean
}

const WeekPlan = (props: WeekPlanProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [modalState, setModalState] = useState<AddRecipeModalState>({ date: new Date(), showModal: false})

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

    function getRecipePlanEvent(date: Date, item?: RecipePlanEvent) {
        let weekDayName = DateUtil.getLocalizedDayName(date)

        if (item) {
            const recipe = item.recipe

            return (
                <DraggableCardView
                    type={CardViewType.Default}
                    title={recipe.title}
                    description={weekDayName}
                    url={recipe.url}
                    imageUrl={recipe.imageUrl}
                    onDragStart={ (event: React.DragEvent) => onDragStart(event, props.recipePlan.events.indexOf(item))} />
            )
        }

        return <EmptyItem dayOfWeek={weekDayName} showAddRecipeModal={() => setModalState({ date: date, showModal: true })} />
    }

    function onDragStart(event: React.DragEvent, selectedItemIndex: number) {
        event.dataTransfer.setData(KEY_SELECTED_ITEM_INDEX, selectedItemIndex.toString())
    }

    function onDragOver(event: React.DragEvent) {
        event.preventDefault()
    }

    function onDrop(event: React.DragEvent, date: Date) {
        let selectedItemIndex = parseInt(event.dataTransfer.getData(KEY_SELECTED_ITEM_INDEX))
        props.updateRecipePlan(selectedItemIndex, DateUtil.getISODate(date))
    }

    function addRecipe(recipeId: number) {
        props.addRecipe(recipeId, DateUtil.getISODate(modalState.date))
        setModalState({ ...modalState, showModal: !modalState.showModal })
    }

    return (
        <div className="recipeplan-container">
            <div className="recipeplan-header">
                <div className="recipeplan-navigation">
                    <div className="recipeplan-selector" onClick={() => previousWeek()}>
                        <img src={ ArrowLeft } alt="Arrow left" style={{ width: '28px', height: '28px' }} />
                    </div>
                    <h2 id="title-week">Uke {DateUtil.getWeekNumber(selectedDate)}</h2>
                    <div className="recipeplan-selector" onClick={() => nextWeek()}>
                        <img src={ ArrowRight } alt="Arrow right" style={{ width: '28px', height: '28px' }} />
                    </div>
                </div>
                <h4 id="title-weekdays">{DateUtil.getWeekStartUntilWeekEnd(selectedDate)}</h4>
            </div>
            
            {
                modalState.showModal &&
                    <Modal onModalClicked={() => setModalState({ ...modalState, showModal: !modalState.showModal })}>
                        <RecipeConsumer>
                            { state => (
                                <AddRecipe fetchRecipes={state.fetchRecipes} addRecipe={addRecipe} state={state.recipes} />
                            )}
                        </RecipeConsumer>
                    </Modal>
            }

            {
                eachDay(startOfWeek(selectedDate, { weekStartsOn: 1 }), endOfWeek(selectedDate, { weekStartsOn: 1 })).map((date, index) => {
                    let recipePlanEvent = props.recipePlan.events.find((item) => {
                        return isSameDay(date, item.date)
                    })

                    return (
                        <div className="recipe-container" key={index}>
                            <div className="item-container"
                                onDragOver={(e) => onDragOver(e)}
                                onDrop={(e) => onDrop(e, date)}>
                                {getRecipePlanEvent(date, recipePlanEvent)}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WeekPlan