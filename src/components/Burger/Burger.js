import React from 'react';
import {withRouter} from 'react-router-dom'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => { 

    const mapIngridients = (ingridinetKey) => {
        return [...Array( props.ingredients[ingridinetKey] )].map( ( _, i ) => {
            return <BurgerIngredient key={ingridinetKey + i} type={ingridinetKey} />;
        } );
    }
    
    // arr jest to argument(array) do ktorego przypne wszystkie elemnety w tablicy ktore beda w jednej tablicy
    const reduceIngridients = (arr, el) => { 
        return arr.concat(el)
    }

    const getTranformedIngidients = () => {
        let transformedIngredients = Object.keys( props.ingredients )
            .map(mapIngridients)
            .reduce(reduceIngridients, []);
        
        return transformedIngredients.length === 0
            ? <p>Please start adding ingredients!</p>
            : transformedIngredients;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {getTranformedIngidients()}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);