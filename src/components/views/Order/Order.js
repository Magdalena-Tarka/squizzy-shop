import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems, cleanCartItems } from '../../../redux/cartRedux.js';
import { getPersonalData, addOrder, cleanOrderForm } from '../../../redux/orderRedux.js';

import styles from './Order.module.scss';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';
import { PersonalDataForm } from '../../features/PersonalDataForm/PersonalDataForm';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Component = ({ className, cartItems, addOrder, personalData, cleanCartItems, cleanOrderForm }) => {

  const [ cartQnty, setCartQnty ] = useState(0);
  const [ subtotalPrice, setSubtotalPrice ] = useState(0);
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
    const [minute, hour, day, month, year] = [
      currentDate.getUTCMinutes(),
      currentDate.getUTCHours(),
      currentDate.getUTCDate(),
      currentDate.getUTCMonth()+1,
      currentDate.getUTCFullYear(),
    ];
    let newDate = month + '/' + day + '/' + year + ', ' + hour + ':' + (minute < 10 ? ('0' + minute) : minute);
    return newDate;
  };

  const order = {
    orderItems: cartItems,
    personalData: personalData,
  };

  const handleAddOrder = event => {
    event.preventDefault();

    if(!order.personalData.firstName ||
      !order.personalData.lastName ||
      !order.personalData.street ||
      !order.personalData.number ||
      !order.personalData.city ||
      !order.personalData.phone)
    {
      alert('You can\'t leave required fields empty!');
    } else if(order.personalData.firstName.length < 2) {
      alert('Name can\'t be shorter than 2 characters');
    } else if(order.personalData.lastName.length < 2) {
      alert('Name can\'t be shorter than 2 characters');
    } else if(order.personalData.street.length < 2) {
      alert('Street can\'t be shorter than 2 characters');
    } else if(order.personalData.city.length < 2) {
      alert('City can\'t be shorter than 2 characters');
    } else if(order.personalData.phone.length < 9) {
      alert('Phone nr can\'t be shorter than 9 numbers');
    } else {

      order.date = getCurrentDate();
      if(!order.orderItems.length) {
        alert('There is nothing in your cart yet, go back to homepage.');
      } else {
        addOrder(order);
        cleanCartItems();
        cleanOrderForm();
        history.push('/');
        //window.location.reload();
      }
    }
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
                  <PersonalDataForm />
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
                      variant="basic"
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
  personalData: PropTypes.object,
  cleanOrderForm: PropTypes.func,
  cleanCartItems: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
  personalData: getPersonalData(state),
});

const mapDispatchToProps = dispatch => ({
  addOrder: arg => dispatch(addOrder(arg)),
  cleanOrderForm: arg => dispatch(cleanOrderForm(arg)),
  cleanCartItems: arg => dispatch(cleanCartItems(arg)),
});

const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Order,
  OrderContainer as Order,
  Component as OrderComponent,
};
