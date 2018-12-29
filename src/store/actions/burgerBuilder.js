import * as actionTypes from './actionTypes'

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