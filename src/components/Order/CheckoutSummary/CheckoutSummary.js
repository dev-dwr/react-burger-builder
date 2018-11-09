import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.css'

const CheckoutSummary = (props)=>{
    return(
        <div className={styles.CheckoutSummary}> 
            <h1>We hope this taste</h1>
                <div style={{width:'100%', height: '500px', margin:'auto'}}>
                    <Burger ingredients ={props.ingredients} />
                </div>
                <Button btnType="Danger" hasClicked = {props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" hasClicked= {props.checkoutContinued}>CONTINUES</Button>
            
                
                
              
        </div>
    )
}

export default CheckoutSummary