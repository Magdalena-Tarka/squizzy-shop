/* selectors */

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_ORDER = createActionName('ADD_ORDER');

/* action creators */
export const addOrder = payload => ({ payload, type: ADD_ORDER });

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
    default:
      return statePart;
  }
};
