import React from 'react'
import BurgerLogo from '../../assets/images/logo/BurgerLogo.png'
import styles from './Logo.css'
const logo = (props)=>(
    <div className = {styles.Logo}>
        <img src = {BurgerLogo} alt = "Burger Logo"/>
    </div>
)

export default logo