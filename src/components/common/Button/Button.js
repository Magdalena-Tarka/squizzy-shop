import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import Button from 'react-bootstrap/Button';

const Component = ({children, variant, className: propClassName, ...props}) => {

  const classes = [];
  if (propClassName) classes.push(propClassName);
  if (variant) classes.push(styles[variant]);

  return (
    <Button
      className={classes.join(' ')}
      type='button'
      variant='dark'
      {...props}
    >
      {children}
    </Button>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export {
  Component as Button,
  Component as ButtonComponent,
};
