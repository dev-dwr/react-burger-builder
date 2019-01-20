import React,{Component} from 'react'

import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.css'
import * as action from  '../../store/actions/index'
 class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation:{
                    require: true,
                    isEmail:true,
                    minLength: 6
                },
                valid: false,
                touched:false,
                errorText: 'Incorret email'
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Your password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched:false,
                errorText: 'Incorret password'
            },


        }
    }
    checkValidation = (value, rules) =>{

        let isValid = true;
        if (rules.required){
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
    inputChangedHandler = (e,controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:e.target.value,
                valid:this.checkValidation(e.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }
    submitHandler = (e) =>{
        e.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }
    render(){
        const formElementsArray = []
        for(let key in this.state.controls){ // Key are going to be 'name' 'street'
        formElementsArray.push({
            id:key,
            config:this.state.controls[key]// orderForm[key] will be  elementType: 'input', elementConfig:{...} itp
        })
    }

        const form = formElementsArray.map(formElement =>(
            <Input
                key = {formElement.id}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                 //id:key UP
                elementType={formElement.config.elementType} //  config:this.state.orderForm[key] store the values elementConfig,elementType and value
                elementConfig={formElement.config.elementConfig}
                changed = {(e)=>this.inputChangedHandler(e,formElement.id)}
                value = {formElement.config.value}
                errorMessage = {formElement.config.errorText}
                touched = {formElement.config.touched}
            />
           
        ))
        return(
            <div className ={styles.Auth}>
                <form onSubmit = {this.submitHandler}>
                {form}

                <Button btnType ="Success">Submit</Button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onAuth: (email,password) => dispatch(action.auth(email,password))
    }
}


export default connect(null , mapDispatchToProps)(Auth)