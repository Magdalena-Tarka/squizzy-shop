import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Input.module.scss';

const Component = ({className, ...props }) => {
  const {
    type = 'text',
    label,
    name,
    validationRules,
    handleValidationEvents,
    handleValidationParams,
    handleInputValue,
  } = props;

  const params = {
    isRequired: handleValidationParams(name, 'isRequired', validationRules),
    isTouched: handleValidationParams(name, 'isTouched'),
    isInvalid: handleValidationParams(name, 'isInvalid'),
    errorMsgs: handleValidationParams(name, 'errorMsgs'),
  };

  const eventHandler = (e) => {
    //onChange && onChange(e);
    handleValidationEvents(e, validationRules);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <label htmlFor={name}>{label}{params.isRequired  && '*'}</label>
      <input
        className={clsx(params.isInvalid && params.isTouched && styles.warning)}
        type={type}
        id={name}
        name={name}
        onChange={eventHandler}
        onBlur={eventHandler}
        onFocus={eventHandler}
        value={handleInputValue(name)}
      />
      <p className={clsx(params.isInvalid && params.isTouched && styles.warning, styles.errorMsg)}>
        {label} {params.errorMsgs}.
      </p>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleValidationEvents: PropTypes.func,
  validationRules: PropTypes.object,
  handleValidationParams: PropTypes.func,
  handleInputValue: PropTypes.func,
};

export {
  Component as Input,
  Component as InputComponent,
};
