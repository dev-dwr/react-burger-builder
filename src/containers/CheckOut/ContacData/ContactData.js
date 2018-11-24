import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
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
                    minLength: 5,
                    maxLength: 5,
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
        loading: false,
    }
  
    orderHandler = (e)=>{
        e.preventDefault()
        this.setState({
            loading: true
        })
        const formData = {}
        for(let key in this.state.orderForm){ // ket this is like country,email
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            orderData:formData,
            ingredients: this.props.ingredients,
            price: this.props.price,
            
        }
        axios.post('/orders.json',order).then((response)=>{
            this.setState({loading:false})
            this.props.history.push('/')
        }).catch(error=>this.setState({loading:false}))
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
        console.log(updatedFormEl)
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
            if(this.state.loading){
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
        
        
        export default ContactData