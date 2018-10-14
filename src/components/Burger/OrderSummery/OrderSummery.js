import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummerry = (props) => {
    const chooseIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (                
                <li key={igKey}>
                    {igKey}: {props.ingredients[igKey]}
                </li>
            )
        });
    return (
        <Aux>
            <div>
                <h2>Your order:</h2>
                <ul>
                    {chooseIngredients}
                </ul>
                <p>
                    Total price: {props.price.toFixed(2)}
                </p>
                <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
                <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
            </div>
        </Aux>
    )
}

export default orderSummerry;