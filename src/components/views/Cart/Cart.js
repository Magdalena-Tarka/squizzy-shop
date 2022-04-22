import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux';

import styles from './Cart.module.scss';
import { CartProduct } from '../../features/CartProduct/CartProduct';
import { OrderSummary } from '../../features/OrderSummary/OrderSummary';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({ className, cartItems }) => {
  const [ cartQuantity, setCartQuantity ] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let count = 0;
    cartItems.forEach(item => {
      count += parseInt(item.quantity);
    });
    setCartQuantity(count);
  }, [cartItems, cartQuantity]);

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.wrapper)}
          lg={12}
          xl={11}
        >
          <div className={styles.content}>

            {!cartItems.length ? (
              <div className={styles.emptyCartBox_wrapper}>
                <h3 className={styles.title}>
                  Cart<span> ({cartQuantity} pcs)</span>
                </h3>
                <Col className={styles.emptyCartBox}>
                  <p>There is no any items in your cart yet</p>
                  <Button
                    className={styles.cart_btn}
                    onClick={() => handleRedirect('/')}
                  >go to homepage</Button>
                </Col>
              </div>
            ) : (
              <div className={styles.body}>

                <div className={styles.main}>
                  <h3 className={styles.title}>
                    Cart<span> ({cartQuantity} pcs)</span>
                  </h3>
                  <Col className={styles.productsList_wrapper} sm={12}>
                    {cartItems.map((cartItem, index) => (
                      <CartProduct key={index} {...cartItem} />
                    ))}
                  </Col>
                </div>

                <div className={styles.aside}>
                  <div className={styles.stickyBox}>
                    <OrderSummary className={styles.cartSummary}>
                      <Button
                        className={styles.cart_btn}
                        onClick={() => handleRedirect('/order')}
                      >make order</Button>
                    </OrderSummary>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartItems: PropTypes.array,
  handleCartAmount: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const CartContainer = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Cart,
  CartContainer as Cart,
  Component as CartComponent,
};
