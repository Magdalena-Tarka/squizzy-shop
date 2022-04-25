import { Dispatch, useEffect, useState } from 'react';
import { useRedirect } from '../../../hooks/useRedirect';

import clsx from 'clsx';

import { connect, ConnectedProps } from 'react-redux';
import { getCartItems, cleanCartItems } from '../../../redux/cartRedux';
import { getPersonalData, addOrderInAPI, cleanOrderForm } from '../../../redux/orderRedux';
import { getValidation } from '../../../redux/validationRedux';

import styles from './Order.module.scss';
import { getCurrentDate } from '../../../utils';
import { IInitialState, IOrder, IOrderForm } from '../../../types';

import { inputFields } from './PersonalDataForm/config';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';
import { PersonalDataForm } from './PersonalDataForm/PersonalDataForm';
import { OrderSummary } from '../../features/OrderSummary/OrderSummary';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

interface IOwnProps {
  className?: string,
}

const Component = ({
  className,
  cartItems,
  personalData,
  orderValidation,
  addOrderInAPI,
  cleanCartItems,
  cleanOrderForm,
}: Props) => {

  const requiredFields = inputFields
    .map(field => field.validationRules.required && field.name)
    .filter(item => !!item);

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [areRequiredFieldsFilled, setAreRequiredFieldsFilled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const pushHomepage = useRedirect('/');

  const order: IOrder = {
    orderItems: cartItems,
    personalData,
    date: '',
  };

  useEffect(() => {
    setAreRequiredFieldsFilled(order.personalData
      && requiredFields.every((field) => field !== false
        && order.personalData[field]
        && order.personalData[field].length));

    setIsFormValid(Object.keys(orderValidation.orderForm)
      .every((field) => orderValidation.orderForm[field as keyof IOrderForm].isInvalid === false));

  }, [areRequiredFieldsFilled, isFormValid, order.personalData, orderValidation, requiredFields]);

  const emptyCartMsg = 'There is nothing in your cart yet, go back to homepage.';
  const invalidFormMsg = 'Please check your data, there is an error.';

  const handleAddOrder = () => {
    if (!order.orderItems.length) return;
    if (!areRequiredFieldsFilled || !isFormValid) {
      setShowError(true);
      return;
    }
    order.date = getCurrentDate();
    console.log('order:', order);
    addOrderInAPI(order);
    cleanCartItems();
    cleanOrderForm();
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleCloseError = () => setShowError(false);
  const handleGoToHp = () => {
    setShow(false);
    pushHomepage();
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
                    <p>{emptyCartMsg}</p>
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
                    disabled={!cartItems.length || !areRequiredFieldsFilled || !isFormValid}
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

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Modal.Title>Thank you for your order!</Modal.Title>
            <Modal.Title>We will contact to you soon.</Modal.Title>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='basic' onClick={handleGoToHp}>
              Go to homepage
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showError} onHide={handleCloseError} centered>
          <Modal.Body>
            <Modal.Title>{invalidFormMsg}</Modal.Title>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  cartItems: getCartItems(state),
  personalData: getPersonalData(state),
  orderValidation: getValidation(state),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addOrderInAPI: (newOrder: IOrder) => dispatch(addOrderInAPI(newOrder)),
  cleanOrderForm: () => dispatch(cleanOrderForm()),
  cleanCartItems: () => dispatch(cleanCartItems()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IOwnProps;

const OrderContainer = connector(Component);

export {
  OrderContainer as Order,
  Component as OrderComponent,
};
