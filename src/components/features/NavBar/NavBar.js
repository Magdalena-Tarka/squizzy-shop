import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux';

import styles from './NavBar.module.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({ className, cartItems }) => {

  const [cartQty, setCartQty] = useState(0);
  const [isOpen, toggleOpen] = useState(false);
  const toggle = () => toggleOpen(!isOpen);

  useEffect(() => {
    let count = 0;
    cartItems.forEach(item => {
      count += parseInt(item.quantity);
    });
    setCartQty(count);
  }, [cartQty, cartItems]);

  return (
    <div className={clsx(className, styles.root)}>
      <Navbar className={styles.navbar} expand='md' fixed='top' variant='dark'>
        <Container className={clsx('glassEffect', styles.container)}>

          <Col className={styles.nav_logo_wrapper}
            xs='auto'
          >
            <div className={clsx('ms-auto', styles.nav_logo)}>
              <NavLink className={styles.logo} to='/'>squizzy</NavLink>
            </div>
          </Col>

          <Col className={clsx('ms-md-auto', styles.nav_menu_wrapper)}
            xs={3}
            md='auto'
          >
            <div className={styles.hamburger} onClick={toggle}>
              <i className={isOpen ? 'bi bi-x' : 'bi bi-list'}></i>
            </div>
            <div className={clsx('ms-auto', isOpen && styles.visible, styles.nav_menu)}>
              <NavLink
                className={clsx('nav_link', styles.nav_link)}
                activeClassName={styles.active}
                exact
                to='/'
              >Home</NavLink>
              <NavLink
                className={clsx('nav_link', styles.nav_link)}
                activeClassName={styles.active}
                to='/products'
              >Products</NavLink>
            </div>
          </Col>

          <Col className={styles.nav_right_wrapper}
            xs='auto'
          >
            <div className={clsx('ms-auto', styles.nav_right)}>
              <NavLink
                className={clsx('nav_link', styles.nav_right_link)}
                activeClassName={styles.active}
                to='/order'
              >Login</NavLink>
              <NavLink
                className={clsx('nav_link', styles.nav_right_link)}
                activeClassName={styles.active}
                to='/cart'
              >Cart ({cartQty})</NavLink>
            </div>
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
