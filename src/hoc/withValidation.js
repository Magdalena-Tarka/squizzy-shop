import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setValidationParam, getOrderValidation, setIsTouched } from '../redux/validationRedux';

// eslint-disable-next-line import/no-anonymous-default-export
export default WrappedComponent => {

  const ValidationHOC = ({ className, ...props }) => {
    const { orderValidation, setValidationParam, setIsTouched } = props;
    const [ formData, setFormData ] = useState('');

    let updateAction;
    const getUpdateAction = action => updateAction = action;

    useEffect(() => {
      updateAction(formData);
    }, [updateAction, formData]);

    const ruleFunctions = {
      required: text => text && text.length > 0,
      pattern: (text, pattern) => pattern && pattern.test(text),
      minLength: (text, minLength) => text && text.length ? text.length >= minLength : true,
      maxLength: (text, maxLength) => text && text.length ?  text.length <= maxLength : true,
    };

    const checkValidation = (form, field, inputText, rules) => {
      Object.keys(rules).forEach(rule => {
        Object.keys(ruleFunctions).forEach(func => {
          if(rule === func) {

            if(typeof rules[rule] === 'boolean') !ruleFunctions[rule](inputText) && setValidationParam(form, field, true);
            else !ruleFunctions[rule](inputText, rules[rule]) && setValidationParam(form, field, true);
          }
        });
      });
    };

    const handleChange = e => {
      setFormData({...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleBlur = (form, field, rules) => {
      setIsTouched(form, field);
      checkValidation(form, field, formData[field], rules);
    };

    const handleFocus = (form, field) => setValidationParam(form, field, false);
    const handleIsRequired = rules => rules.required;
    const handleIsTouched = field => orderValidation[field].isTouched;
    const handleIsInvalid = field => orderValidation[field].isInvalid;

    return (
      <WrappedComponent
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        handleIsRequired={handleIsRequired}
        handleIsTouched={handleIsTouched}
        handleIsInvalid={handleIsInvalid}
        getUpdateAction={getUpdateAction}
        formData={formData}
        {...props}
      />
    );
  };

  ValidationHOC.propTypes = {
    className: PropTypes.string,
    orderValidation: PropTypes.object,
    setValidationParam: PropTypes.func,
    setIsTouched: PropTypes.func,
  };

  const mapStateToProps = state => ({
    orderValidation: getOrderValidation(state),
  });

  const mapDispatchToProps = dispatch => ({
    setValidationParam: (form, key, value) => dispatch(setValidationParam(form, key, value)),
    setIsTouched: (form, key) => dispatch(setIsTouched(form, key)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(ValidationHOC);
};
