import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState)
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngrs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngrs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedSt)
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon
        },
        totalPrice: 4,
        error: false,
        building: false
    })
};

const fetchIngredientsFailed = (state, action) => { return updateObject(state, {error: true})}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action)
            
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action)
            
        case(actionTypes.SET_INGREDIENT): return setIngredient(state, action)
           
        case(actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action)
           
        default: return state
    }
}

export default reducer;