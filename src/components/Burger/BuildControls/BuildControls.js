import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
//.toFixed([digits]) Liczba cyfr, które mają zostać wyświetlone po kropce dziesiętnej; czyli dwa miejsca poprzecinku maja byc wyswietlone
const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current price:<strong> {props.price.toFixed(2)}zł</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
               />
                
        ))}
        <button 
        className = {classes.OrderButton} 
        onClick = {props.clicked}
        disabled = {!props.purchasable}>ORDER NOW</button>
     </div>
);

export default buildControls;




