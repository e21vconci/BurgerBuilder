import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    // per recuperare gli ingredienti dopo l'autenticazione
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
        }
    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            // utilizzando la funzione utility
            return addIngredient(state, action);
            // return {
            //     ...state,   // quando vengono impostati nuovi ingredienti manteniamo anche tutte le altre proprietà distribuendole prima sulla copia dell'array
            //     ingredients: {
            //         ...state.ingredients,   // non crea copie in profondità dell'oggetto, bisogna copiare l'oggetto man mano che si va al suo interno
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // };
        case actionTypes.REMOVE_INGREDIENT:
            // utilizzando la funzione utility
            return removeIngredient(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // };
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
            // return {
            //     ...state,
            //     ingredients: {
            //         salad: action.ingredients.salad,
            //         bacon: action.ingredients.bacon,
            //         cheese: action.ingredients.cheese,
            //         meat: action.ingredients.meat,
            //     },
            //     totalPrice: 4,
            //     error: false
            // };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
            // return {
            //     ...state,
            //     error: true
            // };
        default:
            return state;
    }
};

export default reducer;