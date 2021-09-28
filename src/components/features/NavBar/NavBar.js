import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NavBar.module.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Navbar className={styles.navbar} expand="md" fixed="top" variant="dark">
      <Container className={styles.container}>

        <Col className={styles.logo_wrapper} xs='auto'>
          <Button className={styles.logo} href="/">squizzy</Button>
        </Col>

        <Col className={clsx('ms-md-auto', styles.menu_wrapper)}
          xs={3}
          md='auto'
        >
          <Navbar.Toggle className={styles.hamburger} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className={styles.nav_collapse} id="basic-navbar-nav">
            <Nav className={clsx('ms-auto', styles.nav)}>
              <Nav.Link className={styles.nav_link} href="/">Home</Nav.Link>
              <Nav.Link className={styles.nav_link} href="/cart">Products</Nav.Link>
              <Nav.Link className={styles.nav_link} href="/order">contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Col>

        <Col className={styles.right_nav_wrapper} xs='auto'>
          <Nav.Link className={styles.nav_link} href="/">Login</Nav.Link>
          <Nav.Link className={styles.nav_link} href="/cart">Cart (<span>0</span>)</Nav.Link>
        </Col>
      </Container>
    </Navbar>
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
  Component as NavBar,
  // Container as NavBar,
  Component as NavBarComponent,
};
