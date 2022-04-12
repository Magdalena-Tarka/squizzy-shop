import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ruleFunctions, errorMessages } from './config';
import { getValidation, setValidationParam, setIsTouched, updateErrorMsg } from '../../redux/validationRedux';

// eslint-disable-next-line import/no-anonymous-default-export
export default WrappedComponent => {

  const ValidationHOC = ({ className, ...props }) => {
    const { getValidation, setValidationParam, setIsTouched, updateErrorMsg } = props;
    const [ form, setForm ] = useState('');

    let updateAction;
    const getUpdateAction = action => updateAction = action;

    const checkValidation = (form, field, inputText, rules) => {
      Object.keys(rules).forEach(rule => {
        if(typeof rules[rule] === 'boolean') {
          if(!ruleFunctions[rule](inputText)) {
            setValidationParam(form, field, true);
            updateErrorMsg(form, field, errorMessages[rule]);
          }
        } else if(rule === 'pattern') {
          if(!ruleFunctions[rule](inputText, rules[rule])) {
            setValidationParam(form, field, true);
            updateErrorMsg(form, field, errorMessages[rule][rules[rule].label]);
          }
        }
        else {
          if(!ruleFunctions[rule](inputText, rules[rule])) {
            setValidationParam(form, field, true);
            updateErrorMsg(form, field, errorMessages[rule].replace('{value}', rules[rule]));
          }
        }
      });
    };

    const handleChange = e => updateAction(e.target.name, e.target.value);
    const handleFocus = (form, field) => setValidationParam(form, field, false);

    const handleBlur = (form, field, rules, value) => {
      setIsTouched(form, field);
      checkValidation(form, field, value, rules);
    };

    const handleValidationEvents = (e, rules) => {
      if (e._reactName === 'onChange') handleChange(e);
      if (e._reactName === 'onFocus') handleFocus(e.target.form.id, e.target.name);
      if (e._reactName === 'onBlur') handleBlur(e.target.form.id, e.target.name, rules, e.target.value);
    };

    const handleValidationParams = (field, param, rules) => {
      if(param === 'isRequired') return rules.required;
      return form && getValidation[form][field][param];
    };
    const handleFormName = formName => setForm(formName);

    return (
      <WrappedComponent
        handleValidationEvents={handleValidationEvents}
        handleValidationParams={handleValidationParams}
        getUpdateAction={getUpdateAction}
        handleFormName={handleFormName}
        {...props}
      />
    );
  };

  ValidationHOC.propTypes = {
    className: PropTypes.string,
    getValidation: PropTypes.object,
    setValidationParam: PropTypes.func,
    setIsTouched: PropTypes.func,
    updateErrorMsg: PropTypes.func,
  };

  const mapStateToProps = state => ({
    getValidation: getValidation(state),
  });

  const mapDispatchToProps = dispatch => ({
    setValidationParam: (form, key, value) => dispatch(setValidationParam(form, key, value)),
    setIsTouched: (form, key) => dispatch(setIsTouched(form, key)),
    updateErrorMsg: (form, key, value) => dispatch(updateErrorMsg(form, key, value)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(ValidationHOC);
};
