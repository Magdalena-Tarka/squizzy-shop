// Validation Config
interface IPattern {
  label: string,
  pattern: RegExp,
}
export interface IPatterns {
  namePattern: IPattern,
  streetPattern: IPattern,
  numberPattern: IPattern,
  phonePattern: IPattern,
}
export interface IValidationRules {
  required: boolean,
  pattern: IPattern,
  minLength: number,
  maxLength: number,
}
/*type GetFieldNames<Type> = {
  [Property in keyof Type as Extract<Property, 'name'>]: Type[Property];
};
type FieldNames = GetFieldNames<IInputField>;*/
export type FieldNames = 'firstName' | 'lastName' | 'street' | 'number' | 'city' | 'phone';

interface IInputField {
  name: FieldNames,
  label: string,
  validationRules: IValidationRules,
}
export type InputFields = IInputField[];

// State
interface IOption {
  size: '300ml' | '500ml',
  price: number,
  default?: boolean,
}
export interface IProduct {
  id: string,
  name: string,
  description: string,
  image: string,
  ingredients: string[],
  options: IOption[],
  fruit: boolean,
  vege: boolean,
  pressedJuice: boolean,
  milk: boolean,
}
export interface ILoading {
  active: boolean,
  error: boolean,
}
export interface IItem {
  _id: string,
  name: string,
  image: string,
  ingredients: string[],
  size: string,
  priceSingle: number,
  quantity: number,
}
export type PersonalData = {
  [field in FieldNames]: string
}
export interface IOrder {
  date: string,
  orderItems: IItem[],
  personalData: PersonalData,
}
export type IOrderForm = {
  [field in FieldNames]: {
    isInvalid: boolean,
    isTouched: boolean,
    errorMsgs: string,
  }
}
export interface IProducts {
  data: IProduct[],
  oneProduct: IProduct | undefined,
  loading: ILoading,
}
export interface ICart {
  items: IItem[],
}
export interface IOrders {
  data: IOrder[],
  personalData: PersonalData,
  loading: ILoading,
}
export interface IValidation {
  orderForm: IOrderForm,
}
export interface IInitialState {
  products: IProducts,
  cart: ICart,
  orders: IOrders,
  validation: IValidation,
}

// Redux
