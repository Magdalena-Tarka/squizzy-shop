import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './OrderListItem.module.scss';
import Col from 'react-bootstrap/Col';

const Component = ({className, image, name, note, priceSingle, quantity, size}) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.orderListItem_img}>
      <img src={image} alt={name} />
    </div>

    <Col className={styles.orderListItem_description} sm={7}>
      <p className={styles.orderListItem_title}>{name}</p>
      <p className={styles.orderListItem_size}>{size}</p>
      {!note ? '' : (
        <p className={styles.orderListItem_note}>
          <span>your note: </span>{note}.
        </p>
      )}

    </Col>

    <Col className={styles.orderListItem_details}>
      <p className={styles.orderListItem_qnty}>{quantity}pcs</p>
      <p className={styles.orderListItem_price}>{priceSingle * quantity}$</p>
    </Col>

    {!note ? '' : (
      <p className={styles.orderListItem_note_XXSsize}>
        <span>your note: </span>{note}.
      </p>
    )}
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  note: PropTypes.string,
  priceSingle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
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
