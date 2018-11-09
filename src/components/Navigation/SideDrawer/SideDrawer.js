import React from 'react'
import Logo from '../.././Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.css'
import SideDrawerBackdrop from '../../UI/Backdrop/SideDrawerBackdrop'
import Auxi from '../../../hoc/Auxi'


const sideDrawer = (props)=>{
    let assignedStyles = [styles.SideDrawer, styles.Close]
    if(props.open === true){
     assignedStyles = [styles.SideDrawer, styles.Open]
    }
    return(
        <Auxi>
            <SideDrawerBackdrop show={props.open} clicked = {props.closed}/>
            
        <div className = {assignedStyles.join(' ')}>
        <div className = {styles.Logo}>
            <Logo/>
        </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxi>
    )
}



export default sideDrawer