import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
import glass1 from '../../../assets/glass1.png';
import leaf from '../../../assets/leaf1.png';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Container className={styles.container}>

      <Col className={clsx('glassEffect', styles.glass_wrapper)}
        xs='auto'
        lg={7}
      >
        <div className={clsx(className, styles.inner_wrapper)}>
          <h1 className={clsx(className, styles.inner_logo)}>squizzy</h1>
          <Col className={clsx(className, styles.inner_content)}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer.</p>
          </Col>
          <img className={styles.inner_glass} src={glass1} alt='glass' />
        </div>
      </Col>

      <img className={styles.leaf1} src={leaf} alt='leaf' />
      <img className={styles.leaf2} src={leaf} alt='leaf' />

    </Container>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
