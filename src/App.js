import React, { Component } from 'react';
import Orders from './containers/Orders/Orders'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut'
import {Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
class App extends Component {
 
  
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            {/* the / path doesnt matter as a prefix so this need to be in the last position, FIRST ALWAYS NEED TO BE PREFIX IN SWITCH*/}
            <Route path = "/checkout" component={CheckOut}/>
            <Route path = '/orders' component = {Orders}/>
            <Route path = '/auth' component = {Auth}/>
            <Route path = "/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
