import React, {Component}from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar'
import {connect} from 'react-redux'
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
         <SideDrawer  closed = {this.sideDrawerBackdropHandler} isAuth = {this.props.isAuthenticated} open = {this.state.showSideDrawer}/>
         <Toolbar isAuth = {this.props.isAuthenticated} drawerToggleClicked = {this.sideDrawerToggleHandler}/>
         
         <main className={classes.Content}>
              {this.props.children}
          </main>
      </Auxi>
    )
      
    }
}
   
const mapStateToProps = (state) =>{
    return{
        //CHekking if we are login
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps) (Layout);