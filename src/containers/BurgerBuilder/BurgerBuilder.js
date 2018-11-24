//Orriginn git push originn master ~ to push into github
import React, { Component } from 'react';
import axios from '../../axios-orders'
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        orderClicked: false,
        loading:false,
        error:false,
    }
    componentDidMount(){
        axios.get('https://react-burger-builder-135e4.firebaseio.com/ingredients.json').then((response)=>{
        this.setState({
            ingredients:response.data
        })
        }).catch((error)=>{
        this.setState({error:true})
    })
    }
    updatePurchaseState (ingredients) {
        // ['meat', 'bacon' itd]
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey]; // ['0', '0', '0']
            } )
            .reduce( ( sum, el ) => { //sum jest to accumulator do argument do ktrego bedziemy sumowac , a el to elemnty do sumowania
                return sum + el;
            },0  );
        this.setState( { purchasable: sum > 0 } );
    }
    ////type mean salad, bacon itd , [type] mean value of the ingredient like one bacon
    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //Values of ingredinets are equal to count in burger control
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }
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
     const queryParams = []
     //encodeURIComponent this encode URI
     for(let i in this.state.ingredients){
         //encodeURIComponent koduje zasoby
         //Propert name is eqaul to the value
         //encodeURIComponent(i) name like salad
         //encodeURIComponent(this.state.ingredients[i] value as a 1
         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
     }
     queryParams.push('price=' + this.state.totalPrice.toFixed(2))
     const queryString = queryParams.join('&')
     this.props.history.push({
         pathname:'/checkout',
         search:'?' + queryString
     })   
    }

     render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        //Posting ingredients from datebase
        let orderSummary = null
        let burger = this.state.error===true ? <p>Ingredients cant be loaded</p>:<Spinner/>
        //If ingredinets is not null
        if(this.state.ingredients){
          burger = (<Auxi>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                clicked ={this.orderButtonClicked}
                price={this.state.totalPrice} />
            </Auxi>
            )
        orderSummary = <OrderSummary 
                ingredinets = {this.state.ingredients}
                price = {this.state.totalPrice}
                modalContinue = {this.modalCountinueHandler}
                modalClosed = {this.modalCancelHandler}/>
            
        }
        if(this.state.loading === true){
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

export default withErrorHandler(BurgerBuilder, axios);