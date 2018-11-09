import React, {Component}from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar'

class Layout extends Component {
   state = {
       showSideDrawer: false,
   }
   sideDrawerBackdropHandler = ()=>{
       this.setState({
        showSideDrawer: false,
       })
   }
   sideDrawerToggleHandler = ()=>{
    this.setState(prevState =>{
        return {showSideDrawer:!prevState.showSideDrawer}
    })
   }
   
    render(){
    return(
        <Auxi>
         <SideDrawer  closed = {this.sideDrawerBackdropHandler} open = {this.state.showSideDrawer}/>
         <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
         
         <main className={classes.Content}>
              {this.props.children}
          </main>
      </Auxi>
    )
      
    }
}
   


export default Layout;