import { AnyAction } from 'redux';
import { IItem, ICart } from '../types';
import { initialState } from './initialState';

export type CartState = Record<'cart', ICart>;
export interface IAddToCart {
  type: 'ADD_TO_CART',
  payload: IItem,
}
export interface IRemoveItem extends AnyAction {
  type: 'REMOVE_ITEM',
  payload: {
    id: string,
    size: string,
  },
}
export interface IUpdateItemQuantity extends AnyAction {
  type: 'UPDATE_ITEM_QUANTITY',
  payload: {
    id: string,
    size: string,
    quantity: number,
  },
}
export interface IUpdateItemNote extends AnyAction {
  type: 'UPDATE_ITEM_NOTE',
  payload: {
    id: string,
    size: string,
    note: string,
  },
}
export interface ICleanCartItems extends AnyAction {
  type: 'CLEAN_CART_ITEMS',
}
export type CartAction = IAddToCart | IRemoveItem | IUpdateItemQuantity | IUpdateItemNote | ICleanCartItems;

/* selectors */
export const getCartItems = ({cart}: CartState) => cart.items;

/* action name creator */
const reducerName = 'cart';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const UPDATE_ITEM_QUANTITY = createActionName('UPDATE_ITEM_QUANTITY');
const UPDATE_ITEM_NOTE = createActionName('UPDATE_ITEM_NOTE');
const CLEAN_CART_ITEMS = createActionName('CLEAN_CART_ITEMS');

/* action creators */
export const addToCart = (payload: IItem) => ({ payload, type: ADD_TO_CART });
export const removeItem = (id: string, size: string) => ({ payload: {id, size}, type: REMOVE_ITEM });
export const updateItemQuantity = (id: string, size: string, quantity: number) => ({ payload: {id, size, quantity}, type: UPDATE_ITEM_QUANTITY });
export const updateItemNote = (id: string, size: string, note: string) => ({ payload: {id, size, note}, type: UPDATE_ITEM_NOTE });
export const cleanCartItems = () => ({ type: CLEAN_CART_ITEMS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = initialState[reducerName], action: CartAction): ICart => {
  switch (action.type) {
    case ADD_TO_CART: {
      const inCart = statePart.items.find(item => (item._id === action.payload._id && item.size === action.payload.size) ? true : false);
      return {
        ...statePart,
        items: inCart
          ? statePart.items.map(item =>
            item._id === action.payload._id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + parseInt(action.payload.quantity) }
              : item
          )
          : [...statePart.items, action.payload],
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          (item._id === action.payload.id && item.size === action.payload.size)
            ? {...item, quantity: +action.payload.quantity}
            : item
        ),
      };
    }
    case UPDATE_ITEM_NOTE: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          (item._id === action.payload.id && item.size === action.payload.size)
            ? {...item, note: action.payload.note}
            : item
        ),
      };
    }
    case REMOVE_ITEM: {
      const newArray = [...statePart.items];
      const itemToRemove = newArray.filter(item => item._id === action.payload.id && item.size === action.payload.size)[0];
      const index = newArray.indexOf(itemToRemove);
      newArray.splice(index, 1);
      return {
        ...statePart,
        items: newArray,
      };
    }
    case CLEAN_CART_ITEMS: {
      return {
        ...statePart,
        items: [],
      };
    }
    default:
      return statePart;
  }
};
