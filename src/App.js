import React, { Component } from 'react';
import Orders from './containers/Orders/Orders'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux'
import * as action from './store/actions/index'

class App extends Component {
  
 componentDidMount(){
   this.props.onTryAutoSignUp()
 }
 
  render () {
    let routes = (
      <Switch>
      <Route path = '/auth' component = {Auth}/>
      <Route path = "/" exact component={BurgerBuilder}/>
      <Redirect to ="/"/>
      </Switch>
    )
    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path = "/checkout" component={CheckOut}/>
          <Route path = '/orders' component = {Orders}/>
          <Route path = '/logout' component = {Logout}/>
          <Route path = "/" exact component={BurgerBuilder}/>
          <Redirect to ="/"/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Switch>
            {/* the / path doesnt matter as a prefix so this need to be in the last position, FIRST ALWAYS NEED TO BE PREFIX IN SWITCH*/}
            {routes}
            
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuth: state.auth.token !== null
  }
}
const mapDisaptchToProps = (dispatch)=>{
  return{
    onTryAutoSignUp: () => dispatch(action.authCheckState())
  }
}

//HOC withRouter() passing updated props
export default withRouter(connect(mapStateToProps,mapDisaptchToProps ) (App));
