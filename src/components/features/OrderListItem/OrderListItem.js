import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './OrderListItem.module.scss';
import Col from 'react-bootstrap/Col';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.orderListItem_img}>
      <img src='/images/1.jpeg' alt='' />
    </div>

    <Col className={styles.orderListItem_description} sm={7}>
      <p className={styles.orderListItem_title}>Vegetable red smoothie</p>
      <p className={styles.orderListItem_size}>300ml</p>
      <p className={styles.orderListItem_note}>
        <span>your note: </span>
        Hello, I would like to order smoothie without ginger.
      </p>
    </Col>

    <Col className={styles.orderListItem_details}>
      <p className={styles.orderListItem_qnty}>2pcs</p>
      <p className={styles.orderListItem_price}>24$</p>
    </Col>

    <p className={styles.orderListItem_note_XXSsize}>
      <span>your note: </span>
      Hello, I would like to order smoothie without ginger.
    </p>
  </div>
);

Component.propTypes = {
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
  Component as OrderListItem,
  // Container as OrderListItem,
  Component as OrderListItemComponent,
};
