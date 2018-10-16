import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummerry extends Component {
    
    render() {
        const chooseIngredients = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (                
                <li key={igKey}>
                    {igKey}: {this.props.ingredients[igKey]}
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
                        Total price: {this.props.price.toFixed(2)}
                    </p>
                    <Button btnType='Danger' clicked={this.props.purchaseCanceled}>Cancel</Button>
                    <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
                </div>
            </Aux>
        )
    }
}

export default OrderSummerry;