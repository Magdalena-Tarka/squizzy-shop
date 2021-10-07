import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './CartProduct.module.scss';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Col className={styles.cartProduct_img} sm={3}>
      <img src='/images/1.jpeg' alt='' />
    </Col>

    <Col className={styles.cartProduct_description}
      xs={12}
      sm={7}
    >
      <h4 className={styles.cartProduct_title}>vegetable red smoothie</h4>
      <div>
        <p className={styles.cartProduct_ingredients}>
          <span>ingredients: </span>radish, beetroot, celery, parsley.
        </p>
        <p className={styles.cartProduct_size}>300ml</p>
      </div>
      <Button className={styles.cartProduct_btn}><i className="bi bi-trash-fill" /> remove item</Button>
    </Col>

    <Col className={styles.cartProduct_details} sm={2}>
      <div className={styles.cartProduct_qnty}>
        <input
          type='number'
          value={1}
          //onChange={}
          min={1}
          max={10}
          step={1}
        ></input>
      </div>
      <p>9.90$</p>
    </Col>
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
  Component as CartProduct,
  // Container as CartProduct,
  Component as CartProductComponent,
};
