import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummarry.css';

const checkoutSummarry = (props) => {
    return (
        <div className={classes.CheckoutSummarry}>
            <div style={{width: '100%', paddingTop: '20px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}
                >Continue</Button>
        </div>
    )
}

export default checkoutSummarry;