import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Cart.module.scss';
import { CartProduct } from '../../features/CartProduct/CartProduct';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Container className={styles.container}>
      <Col className={clsx('glassEffect', styles.card_wrapper)}
        lg={12}
        xl={11}
      >
        <Card className={styles.card}>
          <Card.Body className={clsx('g-4', styles.card_body)}>

            <h3 className={styles.card_title}>
              Cart<span> (0 pcs)</span>
            </h3>
            <div className={styles.card_content}>
              <Col className={styles.productsList_wrapper}
                sm={12}
                md={9}
              >
                <CartProduct />
              </Col>

              <Col className={styles.cartSummary_wrapper}
                sm={12}
                md={3}
              >
                <div className={styles.cartSummary}>
                  <Card.Text className={styles.subtotal}>
                    <span>subtotal: </span>9.90$
                  </Card.Text>
                  <Card.Text className={styles.delivery}>
                    <span>delivery: </span>0.00$
                  </Card.Text>
                  <Card.Text className={styles.total}>
                    <span>total: </span>9.90$
                  </Card.Text>
                  <Button className={styles.cart_btn}
                    type="button"
                    variant="warning"
                  >order</Button>
                </div>
              </Col>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Cart,
  // Container as Cart,
  Component as CartComponent,
};
