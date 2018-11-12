import React from 'react'
import styles from './Order.css'
const order = (props)=>{
    //turning object into array
    const ingredients = []
    //props.ingredients[ingredientName] is the value of ingredinets '0' , '1'
    //ingredinetName is the name of ingredinet 'sald' 'meat'
    for (let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName ,amount:props.ingredients[ingredientName]})
    }
    const ingredientOutput = ingredients.map(ingredients =>{
        return <span style = {{textTransform: 'capitalize',display: 'inline-block',margin:'0 8px', border: '1px solid #ccc', padding:'5px'}} key = {ingredients.name}>{ingredients.name} ({ingredients.amount})</span>
    })
    return(
    <div className = {styles.Order}>
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price: <b>{props.price.toFixed(2)} ZŁ</b></p>
    </div>)
    
}
//Converting string of numer into number I used + in {props.price} in Orders.js component
export default order