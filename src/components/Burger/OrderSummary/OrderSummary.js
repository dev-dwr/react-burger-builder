import React, {Component} from 'react'
import Auxi from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'




class OrderSummary extends Component{
   



    render(){
         // Getting Ingridients and past them into Modal window
        const ingredinetSummary = Object.keys(this.props.ingredinets).map((igKey)=>{
            return (<li key ={igKey} >
                <span style ={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredinets[igKey]}
        
         </li>) //igKey is oure key like salad,bacon  PROPS.ingredinets[igKey] is oure numbers of them (value)
    })

        return(
         <Auxi>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {ingredinetSummary}
            </ul>
            <p>Burger will cost : <b> {this.props.price.toFixed(2)}</b></p>
            <p>Continue to checkout?</p>
            <Button btnType = "Danger" hasClicked = {this.props.modalClosed}>Cancel</Button>
            <Button btnType = "Success" hasClicked = {this.props.modalContinue}>Continue</Button>
        </Auxi>
            
        )
    }

    
}


export default OrderSummary