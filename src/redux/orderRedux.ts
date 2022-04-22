import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL } from '../config';
import { IOrder, IOrders, PersonalData } from '../types';
import { initialState } from './initialState';

export type OrderState = Record<'orders', IOrders>;
export interface IAddOrder extends AnyAction {
  type: 'ADD_ORDER',
  payload: IOrder,
}
export interface IUpdateOrderForm extends AnyAction {
  type: 'UPDATE_ORDER_FORM',
  payload: {
    field: string,
    value: string,
  },
}
export interface ICleanOrderForm extends AnyAction {
  type: 'CLEAN_ORDER_FORM',
}
export type OrderAction = IAddOrder | IUpdateOrderForm | ICleanOrderForm;

/* selectors */
export const getPersonalData = ({orders}: OrderState) => orders.personalData;

/* action name creator */
const reducerName = 'orders';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const ADD_ORDER = createActionName('ADD_ORDER');
const UPDATE_ORDER_FORM = createActionName('UPDATE_ORDER_FORM');
const CLEAN_ORDER_FORM = createActionName('CLEAN_ORDER_FORM');

/* action creators */
export const addOrder = (payload: IOrder) => ({ payload, type: ADD_ORDER });
export const updateOrderForm = (field: string, value: string) => ({ payload: {field, value}, type: UPDATE_ORDER_FORM });
export const cleanOrderForm = () => ({ type: CLEAN_ORDER_FORM });

/* thunk creators */
export const addOrderInAPI = (newOrder: IOrder): ThunkAction<void, OrderState, unknown, AnyAction> => {
  return (dispatch) => {
    Axios
      .post(`${API_URL}/orders`, newOrder)
      .then(res => {
        dispatch(addOrder(res.data));
      })
      .catch(err => {
        console.log('error:', err.message);
      });
  };
};

/* reducer */
export const reducer = (statePart = initialState[reducerName], action: OrderAction) => {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case UPDATE_ORDER_FORM: {
      return {
        ...statePart,
        personalData: {
          ...statePart.personalData,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case CLEAN_ORDER_FORM: {
      const personalData = {} as PersonalData;
      for(const field in statePart.personalData) {
        // @ts-ignore
        personalData[field] = '';
      }
      return {
        ...statePart,
        data: [],
        personalData,
      };
    }
    default:
      return statePart;
  }
};
