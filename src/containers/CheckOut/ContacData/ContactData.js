import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component{
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation:{
                    require: true
                },
                valid: false,
                touched:false,
                errorText: 'Incorret name'
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your street'
                },
                value:'',
                validation:{
                    require: true
                },
                valid: false,
                touched:false,
                errorText: 'Incorret street'
            },
            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value:'',
                validation:{
                    require: true,
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                touched:false,
                errorText: 'Incorret zipCode'
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value:'',
                validation:{
                    require: true
                },
                valid: false,
                touched:false,
                errorText: 'Incorret country name'
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your email'
                },
                value:'', 
                validation:{
                    require: true
                },
                valid: false,
                errorText: 'Incorret email'

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'cheapest', displayValue:"Cheapest"},
                        {value: 'fastest', displayValue:"Fastest"}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid:true
            }
        },
        formIsValid: false,
       
    }
  
    orderHandler = (e)=>{
        e.preventDefault()
        const formData = {}
        for(let key in this.state.orderForm){ // key this is like country,email
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            orderData:formData,
            ingredients: this.props.ings,
            price: this.props.price,
            userId:this.props.userId
            
        }
        
        this.props.onOrderBurger(order, this.props.token)
    }
    checkValidation = (value, rules) =>{
        let isValid = true;
        if (rules.require){
            isValid = value.trim() !== "" && isValid //trim method deleting a whitespace
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid
        }          
        return isValid;
        
    }
    inputChangedHandler = (e, inputId)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = {
            ...updatedOrderForm[inputId]// this is a value like email,country
        }
        updatedFormEl.value = e.target.value
        updatedFormEl.touched = true;
        updatedOrderForm[inputId] = updatedFormEl
        updatedFormEl.valid = this.checkValidation(updatedFormEl.value, updatedFormEl.validation)
        let formIsValid = true;
       for(let InputFiles in updatedOrderForm){
           formIsValid = updatedOrderForm[InputFiles].valid && formIsValid
        }
       
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }
    render(){
        const formElementsArray = []
        for(let key in this.state.orderForm){ // Key are going to be 'name' 'street'
        formElementsArray.push({
            id:key,
            config:this.state.orderForm[key]// orderForm[key] will be  elementType: 'input', elementConfig:{...} itp
        })
    }
    
    let form = (
        <form onSubmit = {this.orderHandler}>
        {formElementsArray.map(formElement =>(
            <Input
            invalid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            key = {formElement.id} //id:key UP
            elementType={formElement.config.elementType} //  config:this.state.orderForm[key] store the values elementConfig,elementType and value
            elementConfig={formElement.config.elementConfig}
            changed = {(e)=>this.inputChangedHandler(e,formElement.id)}
            value = {formElement.config.value}
            errorMessage = {formElement.config.errorText}
            touched = {formElement.config.touched}
            
            />
            ))}
            <Button btnType="Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>);
            if(this.props.loading){
                form = <Spinner/>
            }
            return(
                <div className = {styles.ContactData}>
                
                <h4>Contact Data:</h4>
                {form}
                </div>
                )
            }
        }
        const mapStateToProps = (state)=>{
            return{
                ings:state.burger.ingredients,
                price:state.burger.totalPrice,
                loading:state.order.loading,
                token:state.auth.token,
                userId:state.auth.userId

            }
        }
        const mapDispatchToProps = (dispatch) =>{
            return{
              onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))  
            }
            
        }
        
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler (ContactData,axios))