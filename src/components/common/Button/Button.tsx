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

const Component = ({
  className = '',
  children,
  variant,
  disabled,
  onClick,
}: IButtonProps) => {

  const classes = [styles.basic, className];
  if (variant) classes.push(styles[variant]);

  const eventHandler = () => {
    onClick && onClick();
  };

  return (
    <Button
      className={clsx(classes.join(' '))}
      type='button'
      variant='dark' // It is bootstrap button attribute
      onClick={eventHandler}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export {
  Component as Button,
  Component as ButtonComponent,
};
