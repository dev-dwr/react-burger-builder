import * as actionTypes from './actionTypes'

import axios from '../../axios-orders';

export const addIngredient = (ingName)=>{
    return{
        ingredientName:ingName,
        type:actionTypes.ADD_INGREDIENT
    }
}
export const removeIngredient = (ingName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ing)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ing
    }
}

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}


export const initiallyIngredients = ()=>{
    return dispatch =>{
            axios.get('https://react-burger-builder-135e4.firebaseio.com/ingredients.json').then((response)=>{
            dispatch(setIngredients(response.data))
            }).catch((error)=>{
                dispatch(fetchIngredientsFailed(error))
            })
       
    }
}