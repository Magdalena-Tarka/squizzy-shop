import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux';

import styles from './OrderSummary.module.scss';

const Component = ({ className, children, cartItems }) => {

  const [ cartQuantity, setCartQuantity ] = useState(0);
  const [ subtotalPrice, setSubtotalPrice ] = useState(0);

  useEffect(() => {
    let count = 0;
    let price = 0;
    cartItems.forEach(item => {
      count += parseInt(item.quantity);
      price += parseInt(item.priceSingle) * parseInt(item.quantity);
    });
    setCartQuantity(count);
    setSubtotalPrice(price);
  }, [cartItems, cartQuantity]);

  const delivery = 0;
  const totalPrice = subtotalPrice + delivery;

  return (
    <div className={clsx(className, styles.root)}>
      <p className={styles.subtotal}>
        <span>subtotal: </span>{subtotalPrice}$
      </p>
      <p className={styles.delivery}>
        <span>delivery: </span>{delivery}$
      </p>
      <p className={styles.total}>
        <span>total: </span>{totalPrice}$
      </p>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartItems: PropTypes.array,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as OrderSummary,
  Container as OrderSummary,
  Component as OrderSummaryComponent,
};
