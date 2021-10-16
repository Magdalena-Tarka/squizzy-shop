import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Products.module.scss';
import { ProductsList } from '../../features/ProductsList/ProductsList';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Container className={styles.container}>
      <Col className={clsx('glassEffect', styles.wrapper)}>
        <ProductsList className={styles.productsList} />
      </Col>
    </Container>
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
  Component as Products,
  // Container as Products,
  Component as ProductsComponent,
};
