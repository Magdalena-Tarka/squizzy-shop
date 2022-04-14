import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import Button from 'react-bootstrap/Button';

interface IButtonProps {
  children?: React.ReactNode;
  variant?: string;
  className?: string;
}

const Component = ({children, variant, className: propClassName, ...props}: IButtonProps) => {

  const classes = [];
  if (propClassName) classes.push(propClassName);
  if (variant) classes.push(styles[variant]);

  return (
    <Button
      className={clsx(styles.basic, classes.join(' '))}
      type='button'
      variant='dark'
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  Component as Button,
  Component as ButtonComponent,
};
