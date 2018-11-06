import React, { Component} from 'react';
import CheckoutSummarry from '../../components/Order/CheckoutSummary/CheckoutSummarry';
import ContactData from './ContactcData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');                 
    }

 render() {
     let summarry = <Redirect to="/"/>
     if(this.props.ingrs) {
         const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
         summarry = (
            <div>
            {purchaseRedirect }
            <CheckoutSummarry 
                ingredients={this.props.ingrs}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
            <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
         )
     }
     return summarry;
 }
}

const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);