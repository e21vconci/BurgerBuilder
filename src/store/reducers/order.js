import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject( state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject( state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject( action.orderData, { id: action.order } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseBurgerFail = (state, action) => {
    return updateObject( state, { loading: false } );
};

const fetchOrderStart = (state, action) => {
    return updateObject( state, { loading: true } );
};

const fetchOrderSuccess = (state, action) => {
    return updateObject( state, { orders: action.orders, loading: false } );
};

const fetchOrderFail = (state, action) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
            // return {
            //     ...state,
            //     purchased: false
            // };
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
            // return {
            //     ...state,
            //     loading: true
            // };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
            // const newOrder = {
            //     ...action.orderData,
            //     id: action.orderId
            // };
            // return {
            //     ...state,
            //     loading: false,
            //     purchased: true,
            //     orders: state.orders.concat(newOrder)
            // };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
            // return {
            //     ...state,
            //     loading: false
            // };
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state, action);
            // return {
            //     ...state,
            //     loading: true
            // };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
            // return {
            //     ...state,
            //     orders: action.orders,
            //     loading: false
            // };
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state, action);
            // return {
            //     ...state,
            //     loading: false
            // };
        default: 
            return state;
    }
};

export default reducer;