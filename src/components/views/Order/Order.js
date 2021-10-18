import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems, cleanCartItems } from '../../../redux/cartRedux.js';
import { getPersonalData, addOrderInAPI, cleanOrderForm } from '../../../redux/orderRedux.js';

import styles from './Order.module.scss';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';
import { PersonalDataForm } from '../../features/PersonalDataForm/PersonalDataForm';
import { OrderSummary } from '../../features/OrderSummary/OrderSummary';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({ className, cartItems, addOrderInAPI, personalData, cleanCartItems, cleanOrderForm }) => {
  const history  = useHistory();

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
        addOrderInAPI(order);
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
        <Col className={clsx('glassEffect', styles.wrapper)}
          lg={12}
          xl={11}
        >
          <div className={styles.content}>
            <div className={styles.main}>
              <Col className={clsx('_wrapper', styles.orderForm_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderForm_title)}>Fill your data</h5>
                <PersonalDataForm className={styles.orderForm} />
              </Col>

              <Col className={clsx('_wrapper', styles.orderList_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderList_title)}>Your order details</h5>
                <div className={styles.orderList}>
                  {!cartItems.length ? (
                    <p>There is nothing in your cart yet, go back to homepage.</p>
                  ) : cartItems.map(item => (
                    <OrderListItem key={item._id} {...item} />
                  ))}
                </div>
              </Col>

              <Col className={clsx('_wrapper', styles.orderSummary_wrapper)} sm={12}>
                <h5 className={clsx('_title', styles.orderSummary_title)}>Order summary</h5>
                <OrderSummary className={styles.orderSummary}>
                  <Button className={styles.order_btn}
                    variant="basic"
                    onClick={handleAddOrder}
                  >order</Button>
                </OrderSummary>
              </Col>
            </div>

            <div className={styles.aside}>
              <div className={styles.stickyBox}>
                <p className={styles.contactsBox_title}>Do You need help?{'\n'}Feel free to contact us.</p>
                <div className={styles.contactsBox}>
                  <p><i className='bi bi-telephone-fill' /><span>987-654-321</span></p>
                  <p><i className='bi bi-clock-fill' /><span>mon-fri 9-17</span></p>
                  <p><i className='bi bi-envelope-fill' /><span>squizzy@example.com</span></p>
                </div>
              </div>
            </div>
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
  addOrderInAPI: PropTypes.func,
  personalData: PropTypes.object,
  cleanOrderForm: PropTypes.func,
  cleanCartItems: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
  personalData: getPersonalData(state),
});

const mapDispatchToProps = dispatch => ({
  addOrderInAPI: arg => dispatch(addOrderInAPI(arg)),
  cleanOrderForm: arg => dispatch(cleanOrderForm(arg)),
  cleanCartItems: arg => dispatch(cleanCartItems(arg)),
});

const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Order,
  OrderContainer as Order,
  Component as OrderComponent,
};
