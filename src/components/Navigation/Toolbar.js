import React from 'react'
import styles from './Toolbar.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import SideDrawerToggle from '../../components/Navigation/SideDrawer/SideDrawerToggle/SideDrawerToggle'
const toolbar = (props)=>(
    
    <header className = {styles.Toolbar}>
    <SideDrawerToggle clicked = {props.drawerToggleClicked}/>
   

            <div className = {styles.Logo}>
                 <Logo/>
             </div>
        <nav className = {styles.DesktopOnly}>
         
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar