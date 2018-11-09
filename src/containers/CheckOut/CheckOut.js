import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContacData/ContactData'

class Checkout extends Component{
    state = {
        ingredients:null,
        price:0
        
    }
    componentWillMount(){
        console.log(this.props)
        //Czyli ze linku wyciagamy potrzbene informacje o skladnikach przy pomocy new URLSearchParams, a w nawaisie sciazka do tego adresu url
        //creating new URLSerachParams
        // Parametry wyszukiwania adresu URL
        const query =  new  URLSearchParams(this.props.location.search)
        console.log(query)
        //pusty obiekt aby moc przechowac te dane
        const ingredients = {};
        let price = 0
        // 'of' sluzy do wykonowywania dzialan w tablicach, obiektach itd
        //param to wartosc 
        //entries() execute [key, value] 
        for(let param  of query.entries()){
           
            //['salad', '1'] this is param
            //ingrednients[param[0]] its just a name like 'salad'
            //param[1] its a value as a string
            // + this convert to the number
            if(param[0] === 'price'){
              price = param[1]
            }else{
              ingredients[param[0]] = +param[1]  
            }
           
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }
    checkoutCancelledHandler = ()=>{
        //This will back to previous page
        this.props.history.goBack()
    }
    checkoutContinuedHandler = () =>{
        // replace changing path 
        this.props.history.replace('/checkout/contact-data')
    }
    
    
    render(){
       return(
        <div>
            <CheckoutSummary ingredients = {this.state.ingredients} checkoutCancelled = {this.checkoutCancelledHandler} checkoutContinued= {this.checkoutContinuedHandler}/>
            <Route path = {this.props.match.url + '/contact-data'} render = {(props)=>(<ContactData ingredients = {this.state.ingredients} price = {this.state.totalPrice} {...props}/>)}/>
        </div>
       )
    }

}
export default Checkout