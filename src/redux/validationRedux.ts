import { AnyAction } from 'redux';
import { IOrderForm, IValidation } from '../types';
import { initialState } from './initialState';

const reducerName = 'validation';

export type ValidationState = Record<typeof reducerName, IValidation>;
export enum ValidationActionTypes {
  SET_VALIDATION_PARAM = 'app/validation/SET_VALIDATION_PARAM',
  SET_IS_TOUCHED = 'app/validation/SET_IS_TOUCHED',
  UPDATE_ERROR_MSG = 'app/validation/UPDATE_ERROR_MSG',
}
export type Form = keyof IValidation;
export type Key = keyof IOrderForm;
export interface IPayload {
  form: Form,
  key: Key,
  value: boolean | string,
}
export interface ISetValidationParam extends AnyAction {
  type: ValidationActionTypes.SET_VALIDATION_PARAM,
  payload: IPayload,
}
export interface ISetIsTouched extends AnyAction {
  type: ValidationActionTypes.SET_IS_TOUCHED,
  payload: IPayload,
}
export interface IUpdateErrorMsg extends AnyAction {
  type: ValidationActionTypes.UPDATE_ERROR_MSG,
  payload: IPayload,
}
export type ValidationAction = ISetValidationParam | ISetIsTouched | IUpdateErrorMsg;

/* selectors */
export const getValidation = ({validation}: ValidationState) => validation;

/* action creators */
export const setValidationParam = (form: Form, key: Key, value: boolean) => ({ payload: {form, key, value}, type: ValidationActionTypes.SET_VALIDATION_PARAM });
export const setIsTouched = (form: Form, key: Key, value: boolean) => ({ payload: {form, key, value}, type: ValidationActionTypes.SET_IS_TOUCHED });
export const updateErrorMsg = (form: Form, key: Key, value: string) => ({ payload: {form, key, value}, type: ValidationActionTypes.UPDATE_ERROR_MSG });

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
    case ValidationActionTypes.SET_IS_TOUCHED: {
      return handleActionParam(action.payload, statePart, 'isTouched');
    }
    case ValidationActionTypes.SET_VALIDATION_PARAM: {
      return handleActionParam(action.payload, statePart, 'isInvalid');
    }
    case ValidationActionTypes.UPDATE_ERROR_MSG: {
      return handleActionParam(action.payload, statePart, 'errorMsgs');
    }
    default:
      return statePart;
  }
};