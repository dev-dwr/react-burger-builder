import React from 'react'
import styles from './Input.css'

const Input = (props)=>{
    const inputClasses = [styles.InputEl]
    let inputEl = null
    let validationMassage = null
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(styles.Invalid)
        validationMassage = <p className={styles.ValidationError}>{props.errorMessage}</p>
    }

    switch(props.elementType){
        case('input'):
            inputEl = <input className = {inputClasses.join(' ')} {...props.elementConfig} onChange = {props.changed} value = {props.value}/>
            break
        case('textarea'):
            inputEl = <textarea className = {styles.InputEl}{...props.elementConfig} onChange = {props.changed}/>    
            break
        case('select'):
            inputEl = <select onChange = {props.changed} value = {props.value} 
            className = {styles.InputEl}>
            {props.elementConfig.options.map(options => (
                <option key = {options.value} value={options.value} >{options.displayValue}</option>
            ))}
            </select> 
            break;
        default:
        inputEl = <input className = {inputClasses}{...props.elementConfig} onChange = {props.changed}/>

    }
    return(
    <div className = {styles.Input}>
        <label className = {styles.Label}>{props.label}</label>
        {inputEl}
        {validationMassage}
    </div>
    )
     
    
    
}

export default Input