/* selectors */
export const getValidation = ({validation}) => validation;

/* action name creator */
const reducerName = 'validation';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_VALIDATION_PARAM = createActionName('SET_VALIDATION_PARAM');
const SET_IS_TOUCHED = createActionName('SET_IS_TOUCHED');
const UPDATE_ERROR_MSG = createActionName('UPDATE_ERROR_MSG');

/* action creators */
export const setValidationParam = (form, key, value) => ({ payload: {form, key, value}, type: SET_VALIDATION_PARAM });
export const setIsTouched = (form, key, value) => ({ payload: {form, key, value}, type: SET_IS_TOUCHED });
export const updateErrorMsg = (form, key, value) => ({ payload: {form, key, value}, type: UPDATE_ERROR_MSG });

/* thunk creators */
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  const handleActionParam = (payload, statePart, param) => {
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
