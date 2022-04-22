import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import Button from 'react-bootstrap/Button';

interface IButtonProps {
  children?: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean,
  onClick?: () => void,
}

const Component = ({ className: propClassName, ...props }: IButtonProps) => {
  const { children, variant, disabled, onClick } = props;

  const classes = [];
  if (propClassName) classes.push(propClassName);
  if (variant) classes.push(styles[variant]);

  const eventHandler = () => {
    onClick && onClick();
  };

  return (
    <Button
      className={clsx(styles.basic, classes.join(' '))}
      type='button'
      variant='dark'
      onClick={eventHandler}
      disabled={disabled}
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
