import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getFruity, getVege, getJuices/*, reduxActionCreator*/ } from '../../../redux/productsRedux.js';

import styles from './ProductsList.module.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

const Component = ({ className, products, getFruity, getVege, getJuices }) => {

  console.log('products', products);
  console.log('getFruity', getFruity);

  const productsTabs = [
    { id: 'allProducts', name: 'all products', products: products },
    { id: 'fruitSmoothies', name: 'fruit smoothies', products: getFruity },
    { id: 'vegeSmoothies', name: 'vege smoothies', products: getVege },
    { id: 'pressedJuices', name: 'pressed juices', products: getJuices },
  ];

  const [ activeTab, setActiveTab ] = useState(productsTabs[0]);
  const [ activeProducts, setActiveProducts ] = useState(activeTab.products);

  const changeActiveTab = (index) => {
    setActiveTab(productsTabs[index]);
    setActiveProducts(productsTabs[index].products);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.div1}></div>
      <Container className={clsx('glassEffect', styles.container)}>

        <Nav className={clsx('justify-content-center', styles.tabs)}
          //variant="tabs"
          defaultActiveKey="active"
        >
          {productsTabs.map(tab => (
            <Nav.Item key={tab.id} className={styles.tab}>
              <Nav.Link
                className={clsx(tab === activeTab && 'active',
                  tab === activeTab && styles.active,
                  styles.tab_link)}
                onClick={e => {
                  e.preventDefault();
                  changeActiveTab(productsTabs.indexOf(tab));
                }}
              >
                {tab.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Row className={clsx('g-4', styles.products_wrapper)}>
          {activeProducts.map(product => (
            <Col className={styles.product_wrapper}
              key={product.id}
              xs={11}
              sm={6}
              md={4}
              lg={3}
            >
              <Card className={styles.product_card}
                as={Nav.Link}
                href={`/product/${product.id}`}
              >
                <Card.Body className={clsx(styles.card_body)}>
                  <Card.Img className={clsx('mb-2', styles.card_img)}
                    src={product.image}
                    variant="top"
                  />
                  <Card.Title className={styles.card_title}>{product.name}</Card.Title>
                  <Card.Subtitle className={styles.card_price}>price: {product.price}$</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className={styles.div2}></div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  getFruity: PropTypes.array,
  getVege: PropTypes.array,
  getJuices: PropTypes.array,
};

const mapStateToProps = state => ({
  products: getAll(state),
  getFruity: getFruity(state),
  getVege: getVege(state),
  getJuices: getJuices(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ProductsListContainer = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as ProductsList,
  ProductsListContainer as ProductsList,
  Component as ProductsListComponent,
};
