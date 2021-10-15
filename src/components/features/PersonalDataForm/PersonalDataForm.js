import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { updateOrderForm } from '../../../redux/orderRedux.js';

import styles from './PersonalDataForm.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Component = ({ updateOrderForm }) => {

  const [ orderFormData, setOrderFormData ] = useState('');

  useEffect(() => {
    updateOrderForm (orderFormData);
  }, [orderFormData, updateOrderForm]);

  const handleOrderFormData = event => {
    setOrderFormData({...orderFormData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={styles.orderForm}>
      <Row className={styles.row}>
        <Col className={styles.input}
          xs={12}
          sm={6}
        >
          <label>first name*</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            onChange={handleOrderFormData}
            required
            minLength='2'
            maxLength='20'
          />
        </Col>
        <Col className={styles.input}
          xs={12}
          sm={6}
        >
          <label>last name*</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            onChange={handleOrderFormData}
            required
            minLength='2'
            maxLength='20'
          />
        </Col>
      </Row>

      <Row className={styles.row}>
        <Col className={styles.input}
          xs={12}
          sm={9}
        >
          <label>street*</label>
          <input
            type='text'
            id='street'
            name='street'
            onChange={handleOrderFormData}
            required
            minLength='2'
            maxLength='20'
          />
        </Col>
        <Col className={styles.input}
          sm={3}
        >
          <label>number*</label>
          <input
            type='text'
            id='number'
            name='number'
            onChange={handleOrderFormData}
            required
            maxLength='10'
          />
        </Col>
      </Row>

      <Row className={styles.row}>
        <Col className={styles.input}
          xs={12}
          sm={6}
        >
          <label>city*</label>
          <input
            type='text'
            id='city'
            name='city'
            onChange={handleOrderFormData}
            required
            minLength='2'
            maxLength='20'
          />
        </Col>
        <Col className={styles.input}
          xs={12}
          sm={6}
        >
          <label>phone nr*</label>
          <input
            type='text'
            id='phone'
            name='phone'
            onChange={handleOrderFormData}
            required
            minLength='9'
            maxLength='14'
          />
        </Col>
      </Row>
    </form>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  updateOrderForm: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  updateOrderForm: arg => dispatch(updateOrderForm(arg)),
});

const Container = connect(/*mapStateToProps*/null, mapDispatchToProps)(Component);

export {
  //Component as PersonalDataForm,
  Container as PersonalDataForm,
  Component as PersonalDataFormComponent,
};
