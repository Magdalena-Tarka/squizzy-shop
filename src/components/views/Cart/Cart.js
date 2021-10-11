import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './Cart.module.scss';
import { CartProduct } from '../../features/CartProduct/CartProduct';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Component = ({ className, cartItems }) => {
  //console.log('cartItems:', cartItems);

  const [ cartQnty, setCartQnty ] = useState(0);
  const [ subtotalPrice, setSubtotalPrice ] = useState(0);

  useEffect(() => {
    let count = 0;
    let price = 0;
    cartItems.forEach(item => {
      count += parseInt(item.quantity);
      price += parseInt(item.priceSingle) * parseInt(item.quantity);
    });
    setCartQnty(count);
    setSubtotalPrice(price);
  }, [cartItems, cartQnty]);

  const delivery = 0;
  const totalPrice = subtotalPrice + delivery;

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.card_wrapper)}
          lg={12}
          xl={11}
        >
          <Card className={styles.card}>
            <Card.Body className={clsx('g-4', styles.card_body)}>

              <h3 className={styles.card_title}>
                Cart<span> ({cartQnty} pcs)</span>
              </h3>

              {!cartItems.length ? (
                <Col className={styles.emptyCardInfo}>
                  <p>There is no any items in your cart yet</p>
                  <Button className={styles.cart_btn}
                    type="button"
                    variant="warning"
                    as={NavLink}
                    to='/'
                  >go to homepage</Button>
                </Col>
              ) : (
                <div className={styles.card_content}>
                  <Col className={styles.productsList_wrapper}
                    sm={12}
                    md={9}
                  >
                    {cartItems.map((cartItem, index) => (
                      <CartProduct key={index} {...cartItem} />
                    ))}
                  </Col>

                  <Col className={styles.cartSummary_wrapper}
                    sm={12}
                    md={3}
                  >
                    <div className={styles.cartSummary}>
                      <Card.Text className={styles.subtotal}>
                        <span>subtotal: </span>{subtotalPrice}$
                      </Card.Text>
                      <Card.Text className={styles.delivery}>
                        <span>delivery: </span>{delivery}$
                      </Card.Text>
                      <Card.Text className={styles.total}>
                        <span>total: </span>{totalPrice}$
                      </Card.Text>
                      <Button className={styles.cart_btn}
                        type="button"
                        variant="warning"
                        as={NavLink}
                        to='/order'
                      >make order</Button>
                    </div>
                  </Col>
                </div>
              )}
            </Card.Body>
          </Card>
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
