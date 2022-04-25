import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getMilky, getVege, getJuices, fetchAllProducts/*, reduxActionCreator*/ } from '../../../redux/productsRedux';

import styles from './ProductsList.module.scss';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

const Component = ({ className, products, getMilky, getVege, getJuices, fetchAllProducts }) => {
  //console.log('products 1:', products);

  const productsTabs = [
    { id: 'allProducts', name: 'all products', products: products && products },
    { id: 'milkSmoothies', name: 'milk smoothies', products: getMilky },
    { id: 'vegeSmoothies', name: 'vege smoothies', products: getVege },
    { id: 'pressedJuices', name: 'pressed juices', products: getJuices },
  ];
  const defaultTab = productsTabs[0];

  const [ activeTab, setActiveTab ] = useState(productsTabs[0]);

  useEffect(() => {
    //console.log('products 2:', products);
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    //console.log('products 3:', products);
    setActiveTab(defaultTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTab.name, defaultTab.products]);

  const changeActiveTab = (index) => {
    setActiveTab(productsTabs[index]);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Nav className={clsx('justify-content-center', styles.tabs)}
        defaultActiveKey="active"
      >
        {productsTabs.map(tab => (
          <Nav.Item key={tab.id} className={styles.tab}>
            <Nav.Link
              className={clsx(tab.name === activeTab.name && styles.active, styles.tab_link)}
              onClick={() => {changeActiveTab(productsTabs.indexOf(tab));}}
            >
              {tab.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row className={clsx('g-4', styles.products_wrapper)}>
        {activeTab.products.length && activeTab.products.map(product => (
          <Col className={styles.product_wrapper}
            key={product._id}
            xs={11}
            sm={6}
            md={4}
            lg={3}
          >
            <Card className={styles.product_card}
              as={NavLink}
              to={`/product/${product._id}`}
            >
              <Card.Body className={clsx(styles.card_body)}>
                <Card.Img className={clsx('mb-2', styles.card_img)}
                  src={product.image}
                  variant="top"
                />
                <Card.Title className={styles.card_title}>{product.name}</Card.Title>
                <Card.Subtitle className={styles.card_price}>
                  price: {product.options.map(option => option.default && option.price)}$
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  getMilky: PropTypes.array,
  getVege: PropTypes.array,
  getJuices: PropTypes.array,
  fetchAllProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
  getMilky: getMilky(state),
  getVege: getVege(state),
  getJuices: getJuices(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
});

const ProductsListContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as ProductsList,
  ProductsListContainer as ProductsList,
  Component as ProductsListComponent,
};
