import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems, removeItem } from '../../../redux/cartRedux.js';
import { addOrder } from '../../../redux/orderRedux.js';

import styles from './Order.module.scss';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Component = ({ className, cartItems, removeItem, addOrder }) => {
  const [ cartQnty, setCartQnty ] = useState(0);
  const [ subtotalPrice, setSubtotalPrice ] = useState(0);
  const [ orderFormData, setOrderFormData ] = useState({});
  const history  = useHistory();

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

  const getCurrentDate = () => {
    const currentDate = new Date();
    const [minute, hour, day, month, year] = [currentDate.getUTCMinutes(), currentDate.getUTCHours(), currentDate.getUTCDate(), currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()];
    let newDate = month + '/' + day + '/' + year + ', ' + hour + ':' + (minute < 10 ? ('0' + minute) : minute);
    return newDate;
  };

  const order = {
    orderItems: cartItems,
    personalData: orderFormData,
  };

  const handleOrderFormData = event => {
    setOrderFormData({...orderFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddOrder = event => {
    event.preventDefault();
    order.data = getCurrentDate();
    addOrder(order);
    removeItem();
    history.push('/');
    //window.location.reload();
  };

  return (
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
                          onChange={handleOrderFormData}
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
                          onChange={handleOrderFormData}
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
                          onChange={handleOrderFormData}
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
                          onChange={handleOrderFormData}
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
                          onChange={handleOrderFormData}
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
                          onChange={handleOrderFormData}
                        />
                      </Col>
                    </Row>
                  </form>
                </Col>

                <Col className={clsx('_wrapper', styles.orderList_wrapper)} sm={12}>
                  <h5 className={clsx('_title', styles.orderList_title)}>Your order details</h5>
                  <div className={styles.orderList}>
                    {!cartItems.length ? '' : cartItems.map(item => (
                      <OrderListItem key={item.id} {...item} />
                    ))}
                  </div>
                </Col>

                <Col className={clsx('_wrapper', styles.orderSummary_wrapper)} sm={12}>
                  <h5 className={clsx('_title', styles.orderSummary_title)}>Order summary</h5>
                  <div className={styles.orderSummary}>
                    <p className={styles.subtotal}>
                      <span>subtotal: </span>{subtotalPrice}$
                    </p>
                    <p className={styles.delivery}>
                      <span>delivery: </span>{delivery}$
                    </p>
                    <p className={styles.total}>
                      <span>total: </span>{totalPrice}$
                    </p>
                    <Button className={styles.order_btn}
                      type="button"
                      variant="warning"
                      onClick={handleAddOrder}
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
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartItems: PropTypes.array,
  addOrder: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

const mapDispatchToProps = dispatch => ({
  addOrder: arg => dispatch(addOrder(arg)),
  removeItem: () => dispatch(removeItem()),
});

const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Order,
  OrderContainer as Order,
  Component as OrderComponent,
};
