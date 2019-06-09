import React from 'react';
import './weeklist.css';
import CircleView from '../circleview/circleview';
import MealItem from '../mealitem/mealitem';
import EmptyItem from '../emptyitem/emptyitem';

const WeekList = () => {
    const theme = {
        monday: {
            color: 'rgb(232, 101, 100)'
        },
        tuesday: {
            color: 'rgb(132, 202, 220)'
        },
        wednesday: {
            color: 'rgb(237, 209, 39'
        },
        thursday: {
            color: 'rgb(232, 101, 100'
        },
        friday: {
            color: 'rgb(132, 202, 220)'
        }
    }

    return (
        <div className="weeklist-container">
            <div className="container">
                <CircleView 
                    title={'Man'}
                    theme={theme.monday} 
                />
                <div className="item-container">
                    <MealItem 
                        title={'Grillede koteletter med tomat og mozzarella'}
                        description={'Koteletter er enkelt å hanskes med, og anses av mange som perfekt for grillings. Her har vi gjort en italiensk vri og toppet kotelettene med mozzarella og småtomater vendt i pesto. Super grillmat!'}
                    />
                </div>
            </div>
            <div className="container">
                <CircleView
                    title={'Tir'}
                    theme={theme.tuesday}
                />
                <div className="item-container">
                    <MealItem 
                        title={'Grillede koteletter med tomat og mozzarella'}
                        description={'Koteletter er enkelt å hanskes med, og anses av mange som perfekt for grillings. Her har vi gjort en italiensk vri og toppet kotelettene med mozzarella og småtomater vendt i pesto. Super grillmat!'}
                    />
                </div>
            </div>
            <div className="container">
                <CircleView
                    title={'Ons'}
                    theme={theme.wednesday}
                />
                <div className="item-container">
                    <EmptyItem />
                </div>
            </div>
            <div className="container">
                <CircleView
                    title={'Tor'}
                    theme={theme.thursday}
                />
                <div className="item-container">
                    <EmptyItem />
                </div>
            </div>
            <div className="container">
                <CircleView
                    position={'bottom'}
                    title={'Fre'}
                    theme={theme.friday}
                />
                <div className="item-container">
                    <EmptyItem />
                </div>
            </div>
        </div>
    );
}

export default WeekList;