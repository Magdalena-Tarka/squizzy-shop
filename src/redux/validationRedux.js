/* selectors */
export const getOrderValidation = ({validation}) => validation.orderForm;

/* action name creator */
const reducerName = 'validation';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_VALIDATION_PARAM = createActionName('SET_VALIDATION_PARAM');
const SET_IS_TOUCHED = createActionName('SET_IS_TOUCHED');

/* action creators */
export const setValidationParam = (form, key, value) => ({ payload: {form, key, value}, type: SET_VALIDATION_PARAM });
export const setIsTouched = (form, key) => ({ payload: {form, key}, type: SET_IS_TOUCHED });

/* thunk creators */
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SET_IS_TOUCHED: {
      return {
        ...statePart,
        [action.payload.form]: {
          ...statePart[action.payload.form],
          [action.payload.key]: {
            ...statePart[action.payload.form][action.payload.key],
            isTouched: true,
          },
        },
      };
    }
    case SET_VALIDATION_PARAM: {
      return {
        ...statePart,
        [action.payload.form]: {
          ...statePart[action.payload.form],
          [action.payload.key]: {
            ...statePart[action.payload.form][action.payload.key],
            isInvalid: action.payload.value,
          },
        },
      };
    }
    default:
      return statePart;
  }
};
