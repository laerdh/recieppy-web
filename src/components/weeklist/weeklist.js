import React, { useState } from 'react';
import './weeklist.css';
import CircleView from '../circleview/circleview';
import MealItem from '../mealitem/mealitem';
import EmptyItem from '../emptyitem/emptyitem';
import { format, isSameDay, getDay, eachDay, startOfWeek, endOfWeek } from 'date-fns';

const nbLocale = require('date-fns/locale/nb');
const mealsData = [
    {
        date: new Date(2019, 5, 10),
        meal: {
            id: 1,
            title: 'Grillede koteletter med tomat og mozzarella',
            description: 'Koteletter er enkelt å hanskes med, og anses av mange som perfekt for grillings. Her har vi gjort en italiensk vri og toppet kotelettene med mozzarella og småtomater vendt i pesto. Super grillmat!'
        }
    },
    {
        date: new Date(2019, 5, 11),
        meal: {
            id: 2,
            title: 'Asiatisk biffsalat',
            description: 'Salat til middag?  Da er denne deilige biffsalaten med bokhvetenudler og friske grønnsaker midt i blinken.'
        }
    },
    {
        date: new Date(2019, 5, 12),
        meal: {
            id: 3,
            title: 'Tacopai',
            description: 'La to favoritter, taco og pai, smelte sammen i den nydelige kombinasjon tacopai! Nydelig som selvstendig rett, og super som et alternativ for de yngste på en festbuffet.'
        }
    }
]

const WeekList = () => {
    const now = new Date();
    const [meals, setMeals] = useState(mealsData);
    const theme = [
        'rgb(232, 101, 100)',
        'rgb(132, 202, 220)',
        'rgb(237, 209, 39',
        'rgb(232, 101, 100',
        'rgb(132, 202, 220)',
        'rgb(232, 101, 100)',
        'rgb(132, 202, 220)',
    ]

    function onDragStart(ev, itemIndex) {
        ev.dataTransfer.setData("itemIndex", itemIndex)
    }

    function onDragOver(ev) {
        ev.preventDefault()
    }

    function onDrop(ev, date) {
        let itemIndex = ev.dataTransfer.getData("itemIndex")

        setMeals((prevState) => {
            var newState = [...prevState]
            newState[itemIndex].date = date
            return newState
        })
    }

    function getLocalizedDayName(date) {
        var weekDayName = format(date, 'dddd', { locale: nbLocale })
        weekDayName = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1, 3)
        return weekDayName
    }

    function getMealItem(item, date) {
        if (item === undefined) {
            return (
                <div className="item-container"
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e, date)}>
                    <EmptyItem />    
                </div>
            )
        }

        return (
            <div className="item-container">
                <MealItem
                    onDragStart={(e) => onDragStart(e, meals.indexOf(item))}
                    title={item.meal.title}
                    description={item.meal.description}
                />
            </div>
        )
    }

    return (
        <div className="weeklist-container">
            {
                eachDay(startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 })).map((date, index) => {
                    let meal = meals.find((item) => {
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
                            {getMealItem(meal, date)}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default WeekList;