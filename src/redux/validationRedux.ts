import { AnyAction } from 'redux';
import { IOrderForm, IValidation } from '../types';
import { initialState } from './initialState';

export type ValidationState = Record<'validation', IValidation>;
export type Form = keyof IValidation;
export type Key = keyof IOrderForm;
export interface IPayload {
  form: Form,
  key: Key,
  value: boolean | string,
}
export interface ISetValidationParam extends AnyAction {
  type: 'SET_VALIDATION_PARAM',
  payload: IPayload,
}
export interface ISetIsTouched extends AnyAction {
  type: 'SET_IS_TOUCHED',
  payload: IPayload,
}
export interface IUpdateErrorMsg extends AnyAction {
  type: 'UPDATE_ERROR_MSG',
  payload: IPayload,
}
export type ValidationAction = ISetValidationParam | ISetIsTouched | IUpdateErrorMsg;

/* selectors */
export const getValidation = ({validation}: ValidationState) => validation;

/* action name creator */
const reducerName = 'validation';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const SET_VALIDATION_PARAM = createActionName('SET_VALIDATION_PARAM');
const SET_IS_TOUCHED = createActionName('SET_IS_TOUCHED');
const UPDATE_ERROR_MSG = createActionName('UPDATE_ERROR_MSG');

/* action creators */
export const setValidationParam = (form: Form, key: Key, value: boolean) => ({ payload: {form, key, value}, type: SET_VALIDATION_PARAM });
export const setIsTouched = (form: Form, key: Key, value: boolean) => ({ payload: {form, key, value}, type: SET_IS_TOUCHED });
export const updateErrorMsg = (form: Form, key: Key, value: string) => ({ payload: {form, key, value}, type: UPDATE_ERROR_MSG });

/* thunk creators */
/* reducer */
export const reducer = (statePart = initialState[reducerName], action: ValidationAction): IValidation => {
  const handleActionParam = (payload: IPayload, statePart: IValidation, param: string) => {
    const {form, key, value} = payload;
    return {
      ...statePart,
      [form]: {
        ...statePart[form],
        [key]: {
          ...statePart[form][key],
          [param]: value,
        },
      },
    };
  };
  switch (action.type) {
    case SET_IS_TOUCHED: {
      return handleActionParam(action.payload, statePart, 'isTouched');
    }
    case SET_VALIDATION_PARAM: {
      return handleActionParam(action.payload, statePart, 'isInvalid');
    }
    case UPDATE_ERROR_MSG: {
      return handleActionParam(action.payload, statePart, 'errorMsgs');
    }
    default:
      return statePart;
  }
};
