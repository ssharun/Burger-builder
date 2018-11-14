import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls= [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
    
]

const buildControls = (props) => (
    <div className= {classes.BuildControls}>
        <p>
            Currently Price:  
            <strong>
                {props.price.toFixed(2)}
            </strong>
        </p>
        {controls.map(ctrl => (
            <BuildControl
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            remove={()=> props.ingredientRemove(ctrl.type)}
            disable={props.disabled[ctrl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            {props.isAuth? 'Order now': 'Sign up to order'}
        </button>
    </div>
);

export default buildControls;