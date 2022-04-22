import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL } from '../config';
import { IOrder, IOrders, PersonalData } from '../types';
import { initialState } from './initialState';

const reducerName = 'orders';

export type OrderState = Record<typeof reducerName, IOrders>;
export enum OrderActionTypes {
  ADD_ORDER = 'app/orders/ADD_ORDER',
  UPDATE_ORDER_FORM = 'app/orders/UPDATE_ORDER_FORM',
  CLEAN_ORDER_FORM = 'app/orders/CLEAN_ORDER_FORM',
}
export interface IAddOrder extends AnyAction {
  type: OrderActionTypes.ADD_ORDER,
  payload: IOrder,
}
export interface IUpdateOrderForm extends AnyAction {
  type: OrderActionTypes.UPDATE_ORDER_FORM,
  payload: {
    field: string,
    value: string,
  },
}
export interface ICleanOrderForm extends AnyAction {
  type: OrderActionTypes.CLEAN_ORDER_FORM,
}
export type OrderAction = IAddOrder | IUpdateOrderForm | ICleanOrderForm;

/* selectors */
export const getPersonalData = ({orders}: OrderState) => orders.personalData;

/* action creators */
export const addOrder = (payload: IOrder) => ({ payload, type: OrderActionTypes.ADD_ORDER });
export const updateOrderForm = (field: string, value: string) => ({ payload: {field, value}, type: OrderActionTypes.UPDATE_ORDER_FORM });
export const cleanOrderForm = () => ({ type: OrderActionTypes.CLEAN_ORDER_FORM });

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
    case OrderActionTypes.ADD_ORDER: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case OrderActionTypes.UPDATE_ORDER_FORM: {
      return {
        ...statePart,
        personalData: {
          ...statePart.personalData,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case OrderActionTypes.CLEAN_ORDER_FORM: {
      const personalData = {} as PersonalData;
      for(const field in statePart.personalData) {
        personalData[field as keyof PersonalData] = '';
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
