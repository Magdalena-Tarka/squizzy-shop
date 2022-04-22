import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL } from '../config';
import { IProduct, IProducts } from '../types';
import { initialState } from './initialState';

export type ProductsState = Record<'products', IProducts>;
export interface IFetchStarted extends AnyAction {
  type: 'FETCH_START',
}
export interface IFetchError extends AnyAction {
  type: 'FETCH_ERROR',
  payload: boolean,
}
export interface IFetchSuccess extends AnyAction {
  type: 'FETCH_PRODUCTS',
  payload: IProduct[]
}
export interface IFetchOneProduct extends AnyAction {
  type: 'FETCH_ONE_PRODUCT',
  payload: IProduct,
}
export type ProductsAction = IFetchStarted | IFetchError | IFetchSuccess | IFetchOneProduct;

/* selectors */
export const getAll = ({products}: ProductsState) => products.data;
export const getOne = ({products}: ProductsState) => products.oneProduct;
export const getMilky = ({products}: ProductsState) => products.data.filter(item => item.milk === true);
export const getVege = ({products}: ProductsState) => products.data.filter(item => item.vege === true);
export const getJuices = ({products}: ProductsState) => products.data.filter(item => item.pressedJuice === true);

/* action name creator */
const reducerName = 'products';
const createActionName = (name: string): string => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_PRODUCTS = createActionName('FETCH_PRODUCTS');
const FETCH_ONE_PRODUCT = createActionName('FETCH_ONE_PRODUCT');

/* action creators */
export const fetchStarted = () => ({ type: FETCH_START });
export const fetchError = (payload: boolean) => ({ payload, type: FETCH_ERROR });
export const fetchProducts = (payload: IProduct[]) => ({ payload, type: FETCH_PRODUCTS });
export const fetchOneProduct = (payload: IProduct) => ({ payload, type: FETCH_ONE_PRODUCT });

/* thunk creators */
export const fetchAllProducts = (): ThunkAction<void, ProductsState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(fetchStarted);

    if(!getState().products.data.length && getState().products.loading.active === false) {
      Axios
        .get(`${API_URL}/products`)
        .then(res => {
          dispatch(fetchProducts(res.data));
        })
        .catch(err => {
          console.log('error:', err.message);
          dispatch(fetchError(true));
        });
    }
  };
};
export const fetchOneFromAPI = (id: string): ThunkAction<void, ProductsState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(fetchStarted);

    Axios
      .get(`${API_URL}/product/${id}`)
      .then(res => {
        dispatch(fetchOneProduct(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = initialState.products, action:ProductsAction): IProducts => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_PRODUCTS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ONE_PRODUCT: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneProduct: action.payload,
      };
    }
    default:
      return statePart;
  }
};
