import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContacData/ContactData'

//import * as actions from '../../store/actions//index'
import {connect} from 'react-redux'
class Checkout extends Component{


    


    checkoutCancelledHandler = ()=>{
        //This will back to previous page
        this.props.history.goBack()
    }
    checkoutContinuedHandler = () =>{
        // replace changing path 
        this.props.history.replace('/checkout/contact-data')
    }
    
    
    render(){
        let summary = <Redirect to="/"/>
        
        if(this.props.ings){
            const purchasedRedirect =this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>    
                {purchasedRedirect}
                <CheckoutSummary ingredients = {this.props.ings} checkoutCancelled = {this.checkoutCancelledHandler} checkoutContinued= {this.checkoutContinuedHandler}/>
                <Route path = {this.props.match.url + '/contact-data'} component = {ContactData}/>
                </div>
                )
            }
            return summary 
                
                
            }
            
        }
        const mapStateToProps = state=>{
            return{
                ings:state.burger.ingredients,
                purchased:state.order.purchased
            }
        }
      
        
        export default connect(mapStateToProps)(Checkout)