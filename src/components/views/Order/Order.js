import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Order.module.scss';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
            <div className={styles.card_content}>

              <Col className={clsx('_wrapper', styles.orderForm_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderForm_title)}>Fill your data</h5>
                <form className={styles.orderForm}>

                  <Row className={styles.row}>
                    <Col className={styles.input}
                      xs={12}
                      sm={6}
                    >
                      <label>first name</label>
                      <input
                        type='text'
                        id='firstName'
                        name='firstName'
                      />
                    </Col>
                    <Col className={styles.input}
                      xs={12}
                      sm={6}
                    >
                      <label>last name</label>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                      />
                    </Col>
                  </Row>

                  <Row className={styles.row}>
                    <Col className={styles.input}
                      xs={12}
                      sm={9}
                    >
                      <label>street</label>
                      <input
                        type='text'
                        id='street'
                        name='street'
                      />
                    </Col>
                    <Col className={styles.input}
                      sm={3}
                    >
                      <label>number</label>
                      <input
                        type='text'
                        id='number'
                        name='number'
                      />
                    </Col>
                  </Row>

                  <Row className={styles.row}>
                    <Col className={styles.input}
                      xs={12}
                      sm={6}
                    >
                      <label>city</label>
                      <input
                        type='text'
                        id='city'
                        name='city'
                      />
                    </Col>
                    <Col className={styles.input}
                      xs={12}
                      sm={6}
                    >
                      <label>phone nr</label>
                      <input
                        type='text'
                        id='phone'
                        name='phone'
                      />
                    </Col>
                  </Row>
                </form>
              </Col>

              <Col className={clsx('_wrapper', styles.orderList_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderList_title)}>Your order details</h5>
                <div className={styles.orderList}>
                  <OrderListItem />
                </div>
              </Col>

              <Col className={clsx('_wrapper', styles.orderSummary_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderSummary_title)}>Order summary</h5>
                <div className={styles.orderSummary}>
                  <p className={styles.subtotal}>
                    <span>subtotal: </span>24$
                  </p>
                  <p className={styles.delivery}>
                    <span>delivery: </span>0$
                  </p>
                  <p className={styles.total}>
                    <span>total: </span>24$
                  </p>
                  <Button className={styles.order_btn}
                    type="button"
                    variant="warning"
                  >order</Button>
                </div>
              </Col>
            </div>

            <div className={styles.card_content_aside}>
              <div className={styles.aside}>
                <p className={styles.aside_title}>Do You need help?{'\n'}Feel free to contact us.</p>
                <div className={styles.aside_contacts}>
                  <p><i className='bi bi-telephone-fill' /><span>987-654-321</span></p>
                  <p><i className='bi bi-clock-fill' /><span>mon-fri 9-17</span></p>
                  <p><i className='bi bi-envelope-fill' /><span>squizzy@example.com</span></p>
                </div>
              </div>
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
  Component as Order,
  // Container as Order,
  Component as OrderComponent,
};
