import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Input.module.scss';

const Component = ({className, ...props }) => {
  const {
    type = 'text',
    label,
    name,
    isRequired,
    isTouched,
    isInvalid,
    onChange,
    onBlur,
    onFocus,
    errorMsg,
  } = props;

  return (
    <div className={clsx(className, styles.root)}>
      <label htmlFor={name}>{label}{isRequired  && '*'}</label>
      <input
        className={clsx(isInvalid && isTouched && styles.warning)}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <p className={clsx(isInvalid && isTouched && styles.warning, styles.errorMsg)}>{errorMsg}</p>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isTouched: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  errorMsg: PropTypes.string,
};

export {
  Component as Input,
  Component as InputComponent,
};
