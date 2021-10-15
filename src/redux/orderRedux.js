/* selectors */
export const getPersonalData = ({order}) => order.personalData;

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_ORDER = createActionName('ADD_ORDER');
const UPDATE_ORDER_FORM = createActionName('UPDATE_ORDER_FORM');
const CLEAN_ORDER_FORM = createActionName('CLEAN_ORDER_FORM');

/* action creators */
export const addOrder = payload => ({ payload, type: ADD_ORDER });
export const updateOrderForm = payload => ({ payload, type: UPDATE_ORDER_FORM });
export const cleanOrderForm = payload => ({ payload, type: CLEAN_ORDER_FORM });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
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
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          street: action.payload.street,
          number: action.payload.number,
          city: action.payload.city,
          phone: action.payload.phone,
        },
      };
    }
    case CLEAN_ORDER_FORM: {
      return {
        ...statePart,
        data: [],
        personalData: {},
      };
    }
    default:
      return statePart;
  }
};
