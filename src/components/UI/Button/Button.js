import React from 'react'
import styles from './Button.css'
const button = (props) =>( // BtnType must be Danger or Succes class join with whitespace
    <button className = {[styles.Button,styles[props.btnType]].join(' ')} onClick = {props.hasClicked} >{props.children}</button>
)


export default button