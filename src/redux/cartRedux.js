/* selectors */
export const getCartItems = ({cart}) => cart.items;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const UPDATE_ITEM_QNTY = createActionName('UPDATE_ITEM_QNTY');
const UPDATE_ITEM_NOTE = createActionName('UPDATE_ITEM_NOTE');

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeItem = (id, size) => ({ payload: {id, size}, type: REMOVE_ITEM });
export const updateItemQnty = (itemId, qnty) => ({ payload: {id: itemId, qnty}, type: UPDATE_ITEM_QNTY });
export const updateItemNote = (itemId, note) => ({ payload: {id: itemId, note}, type: UPDATE_ITEM_NOTE });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...statePart,
        items: [...statePart.items, action.payload],
      };
    }
    case UPDATE_ITEM_QNTY: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: +action.payload.qnty}
            : item
        ),
      };
    }
    case UPDATE_ITEM_NOTE: {
      return {
        ...statePart,
        items: statePart.items.map(item =>
          item.id === action.payload.id
            ? {...item, note: action.payload.note}
            : item
        ),
      };
    }
    case REMOVE_ITEM: {
      const newArray = [...statePart.items];
      const itemToRemove = newArray.filter(item => item.id === action.payload.id && item.size === action.payload.size)[0];
      const index = newArray.indexOf(itemToRemove);
      newArray.splice(index, 1);
      return {
        ...statePart,
        items: newArray,
      };
    }
    default:
      return statePart;
  }
};
