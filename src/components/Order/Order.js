import React from 'react'
import styles from './Order.css'
const order = (props)=>(
    <div className = {styles.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <b>4 zł</b></p>
    </div>
)
export default order