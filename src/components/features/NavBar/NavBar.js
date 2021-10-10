import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './NavBar.module.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Component = ({ className, cartItems }) => {

  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    let count = 0;
    cartItems.forEach(item => {
      count += parseInt(item.quantity);
    });
    setCartQty(count);
  }, [cartQty, cartItems]);

  return (
    <div className={clsx(className, styles.root)}>
      <Navbar className={styles.navbar} expand="md" fixed="top" variant="dark">
        <Container className={clsx('glassEffect', styles.container)}>

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
                <Nav.Link className={styles.nav_link} as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link className={styles.nav_link} as={NavLink} to="/cart">Products</Nav.Link>
                <Nav.Link className={styles.nav_link} as={NavLink} to="/order">contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>

          <Col className={styles.right_nav_wrapper} xs='auto'>
            <Nav.Link className={styles.nav_link} as={NavLink} to="/">Login</Nav.Link>
            <Nav.Link className={styles.nav_link} as={NavLink} to="/cart">Cart ({cartQty})</Nav.Link>
          </Col>
        </Container>
      </Navbar>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartItems: PropTypes.array,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const NavBarContainer = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as NavBar,
  NavBarContainer as NavBar,
  Component as NavBarComponent,
};
