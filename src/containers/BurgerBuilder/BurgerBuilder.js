
import React, { Component } from 'react';

//redux
import {connect} from 'react-redux'
import * as actionType from '../../store/actions'

import axios from '../../axios-orders'
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

class BurgerBuilder extends Component {
    state = {
        orderClicked: false,
        loading:false,
        error:false,
    }
   // componentDidMount(){
       // axios.get('https://react-burger-builder-135e4.firebaseio.com/ingredients.json').then((response)=>{
      //  this.setState({
      //      ingredients:response.data
    //    })
     //   }).catch((error)=>{
     //   this.setState({error:true})
  //  })
  //  }
    updatePurchaseState () {
        // ['meat', 'bacon' itd]
        const sum = Object.keys( this.props.ings )
            .map( igKey => {
                return this.props.ings[igKey]; // ['0', '0', '0']
            } )
            .reduce( ( sum, el ) => { //sum jest to accumulator do argument do ktrego bedziemy sumowac , a el to elemnty do sumowania
                return sum + el;
            },0  );
        return sum > 0
    }
    ////type mean salad, bacon itd , [type] mean value of the ingredient like one bacon
   
    
    orderButtonClicked = ()=>{
        this.setState({
            orderClicked: true
        }) 
    }
    modalCancelHandler = () =>{
        this.setState({
            orderClicked: false
        })
    }

    modalCountinueHandler = () =>{
      //  this.setState({
      //      loading: true
      //  })
      //  const order = {
      //      ingredients: this.state.ingredients,
      //      price: this.state.totalPrice.toFixed(2),
      //      customer:{
      //          name: 'Dawid Rymarczyk',
      //          address:{
      //              street: 'teststreet 1',
      //              zipCode:'55-100',
      //              country: 'Poland'
//
      //          },
      //          emial: 'test@test.com',
//
      //      },
      //      deliveryMethod: 'fastest'
      //  }
      //  axios.post('/orders.json',order).then((response)=>{
    //       this.setState({loading:false,orderClicked:false})
     //   }).catch(error=>this.setState({loading:false,orderClicked:false}))
     
     //encodeURIComponent this encode URI
         //encodeURIComponent koduje zasoby
         //Propert name is eqaul to the value
         //encodeURIComponent(i) name like salad
         //encodeURIComponent(this.state.ingredients[i] value as a 1
        this.props.history.push('/checkout')
    }

     render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        //Posting ingredients from datebase
        let orderSummary = null
        let burger = this.state.error===true ? <p>Ingredients cant be loaded</p>: <Spinner/>
        //If ingredinets is not null
        if(this.props.ings){
          burger = (<Auxi>
            <Burger ingredients={this.props.ings} />
            <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                clicked ={this.orderButtonClicked}
                price={this.props.price} />
            </Auxi>
            )
        orderSummary = <OrderSummary 
                ingredinets = {this.props.ings}
                price = {this.props.price}
                modalContinue = {this.modalCountinueHandler}
                modalClosed = {this.modalCancelHandler}/>
            
        }
        if(this.state.loading ===true){
            orderSummary = <Spinner/>
         }

         
        
        return (
            <Auxi>
                <Modal show ={this.state.orderClicked} modalClosed = {this.modalCancelHandler}>
                    {orderSummary}    
                </Modal>
               {burger}
            </Auxi>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onIngredientAdded: (ingName)=> dispatch({type:actionType.ADD_INGREDIENT, ingredientName:ingName}), 
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}
const mapStateToProps = (state)=>{
    return{
        ings: state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));