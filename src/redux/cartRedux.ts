import { AnyAction } from 'redux';
import { IItem, ICart } from '../types';
import { initialState } from './initialState';

const reducerName = 'cart';

export type CartState = Record<typeof reducerName, ICart>;
export enum CartActionTypes {
  ADD_TO_CART = 'app/cart/ADD_TO_CART',
  REMOVE_ITEM = 'app/cart/REMOVE_ITEM',
  UPDATE_ITEM_QUANTITY = 'app/cart/UPDATE_ITEM_QUANTITY',
  UPDATE_ITEM_NOTE = 'app/cart/UPDATE_ITEM_NOTE',
  CLEAN_CART_ITEMS = 'app/cart/CLEAN_CART_ITEMS',
}
export interface IAddToCart {
  type: CartActionTypes.ADD_TO_CART,
  payload: IItem,
}
export interface IRemoveItem extends AnyAction {
  type: CartActionTypes.REMOVE_ITEM,
  payload: {
    id: string,
    size: string,
  },
}
export interface IUpdateItemQuantity extends AnyAction {
  type: CartActionTypes.UPDATE_ITEM_QUANTITY,
  payload: {
    id: string,
    size: string,
    quantity: number,
  },
}
export interface IUpdateItemNote extends AnyAction {
  type: CartActionTypes.UPDATE_ITEM_NOTE,
  payload: {
    id: string,
    size: string,
    note: string,
  },
}
export interface ICleanCartItems extends AnyAction {
  type: CartActionTypes.CLEAN_CART_ITEMS,
}
export type CartAction = IAddToCart | IRemoveItem | IUpdateItemQuantity | IUpdateItemNote | ICleanCartItems;

/* selectors */
export const getCartItems = ({cart}: CartState) => cart.items;

/* action creators */
export const addToCart = (payload: IItem) => ({ payload, type: CartActionTypes.ADD_TO_CART });
export const removeItem = (id: string, size: string) => ({ payload: {id, size}, type: CartActionTypes.REMOVE_ITEM });
export const updateItemQuantity = (id: string, size: string, quantity: number) => ({ payload: {id, size, quantity}, type: CartActionTypes.UPDATE_ITEM_QUANTITY });
export const updateItemNote = (id: string, size: string, note: string) => ({ payload: {id, size, note}, type: CartActionTypes.UPDATE_ITEM_NOTE });
export const cleanCartItems = () => ({ type: CartActionTypes.CLEAN_CART_ITEMS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = initialState[reducerName], action: CartAction): ICart => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART: {
      const inCart = statePart.items.find(item => (item._id === action.payload._id && item.size === action.payload.size) ? true : false);
      return {
        ...statePart,
        items: inCart
          ? statePart.items.map(item =>
            item._id === action.payload._id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
          : [...statePart.items, action.payload],
      };
    }
    case CartActionTypes.UPDATE_ITEM_QUANTITY: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          (item._id === action.payload.id && item.size === action.payload.size)
            ? {...item, quantity: +action.payload.quantity}
            : item
        ),
      };
    }
    case CartActionTypes.UPDATE_ITEM_NOTE: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          (item._id === action.payload.id && item.size === action.payload.size)
            ? {...item, note: action.payload.note}
            : item
        ),
      };
    }
    case CartActionTypes.REMOVE_ITEM: {
      const newArray = [...statePart.items];
      const itemToRemove = newArray.filter(item => item._id === action.payload.id && item.size === action.payload.size)[0];
      const index = newArray.indexOf(itemToRemove);
      newArray.splice(index, 1);
      return {
        ...statePart,
        items: newArray,
      };
    }
    case CartActionTypes.CLEAN_CART_ITEMS: {
      return {
        ...statePart,
        items: [],
      };
    }
    default:
      return statePart;
  }
};
