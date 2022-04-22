import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './initialState';
//import { IInitialState } from '../types';
import { reducer as productsReducer } from './productsRedux';
import { reducer as cartReducer } from './cartRedux';
import { reducer as orderReducer } from './orderRedux';
import { reducer as validationReducer } from './validationRedux';

// define reducers
const reducers = {
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  validation: validationReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  // @ts-ignore
  if (typeof reducers[item] == 'undefined') {
    // @ts-ignore
    reducers[item] = (statePart = initialState[item]) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
