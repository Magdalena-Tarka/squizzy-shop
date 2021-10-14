import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Container className={styles.container}>
      <Col className={clsx('glassEffect', styles.card_wrapper)}
        lg={12}
        xl={11}
      >
        <Col
          className={styles.inner}
        >
          <h3>404</h3>
          <h3>Not Found</h3>
          <p>
            The page you are looking for seems to not exist..
          </p>
          <Button className={styles.nf_btn}
            variant="basic"
            as={NavLink}
            to='/'
          >go to homepage</Button>
        </Col>
      </Col>
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
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
