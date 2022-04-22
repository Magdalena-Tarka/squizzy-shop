import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_URL } from '../config';
import { IProduct, IProducts } from '../types';
import { initialState } from './initialState';

const reducerName = 'products';

export type ProductsState = Record<typeof reducerName, IProducts>;
export enum ProductsActionTypes {
  FETCH_START = 'app/products/FETCH_START',
  FETCH_ERROR = 'app/products/FETCH_ERROR',
  FETCH_PRODUCTS = 'app/products/FETCH_PRODUCTS',
  FETCH_ONE_PRODUCT = 'app/products/FETCH_ONE_PRODUCT',
}
export interface IFetchStarted extends AnyAction {
  type: ProductsActionTypes.FETCH_START,
}
export interface IFetchError extends AnyAction {
  type: ProductsActionTypes.FETCH_ERROR,
  payload: boolean,
}
export interface IFetchProducts extends AnyAction {
  type: ProductsActionTypes.FETCH_PRODUCTS,
  payload: IProduct[]
}
export interface IFetchOneProduct extends AnyAction {
  type: ProductsActionTypes.FETCH_ONE_PRODUCT,
  payload: IProduct,
}
export type ProductsAction = IFetchStarted | IFetchError | IFetchProducts | IFetchOneProduct;

/* selectors */
export const getAll = ({products}: ProductsState) => products.data;
export const getOne = ({products}: ProductsState) => products.oneProduct;
export const getMilky = ({products}: ProductsState) => products.data.filter(item => item.milk === true);
export const getVege = ({products}: ProductsState) => products.data.filter(item => item.vege === true);
export const getJuices = ({products}: ProductsState) => products.data.filter(item => item.pressedJuice === true);

/* action creators */
export const fetchStarted = () => ({ type: ProductsActionTypes.FETCH_START });
export const fetchError = (payload: boolean) => ({ payload, type: ProductsActionTypes.FETCH_ERROR });
export const fetchProducts = (payload: IProduct[]) => ({ payload, type: ProductsActionTypes.FETCH_PRODUCTS });
export const fetchOneProduct = (payload: IProduct) => ({ payload, type: ProductsActionTypes.FETCH_ONE_PRODUCT });

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
export const reducer = (statePart = initialState[reducerName], action:ProductsAction): IProducts => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case ProductsActionTypes.FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ProductsActionTypes.FETCH_PRODUCTS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case ProductsActionTypes.FETCH_ONE_PRODUCT: {
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
