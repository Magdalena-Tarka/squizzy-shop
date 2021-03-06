import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';
import { Header } from '../../layout/Header/Header';
import { InfoBoxes } from '../../features/InfoBoxes/InfoBoxes';
import { ProductsList } from '../../features/ProductsList/ProductsList';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Header />
    <InfoBoxes />
    <div className={styles.productsList_wrapper}>
      <div className={styles.div1}></div>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.wrapper)}>
          <ProductsList className={styles.productsList} />
        </Col>
      </Container>
      <div className={styles.div2}></div>
    </div>
    {children}
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
