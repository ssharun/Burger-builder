import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummerry from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    updatePurcasheIngredients(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinued = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingrs
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummerry = null;
        let burger = this.props.error? <p>Something wrong</p> : <Spinner/>

        if(this.props.ingrs) {
            burger = (
                <Aux>
                    <Burger ingredients ={this.props.ingrs}/>
                    <BuildControls 
                        ingredientAdded={this.props.onAddedIngredients}
                        ingredientRemove ={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable = {this.updatePurcasheIngredients(this.props.ingrs)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummerry = <OrderSummerry 
                                ingredients={this.props.ingrs}
                                price={this.props.price}
                                purchaseContinued= {this.purchaseContinued}
                                purchaseCanceled={this.purchaseCancelHandler}
                            />
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                        {orderSummerry}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedIngredients: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));