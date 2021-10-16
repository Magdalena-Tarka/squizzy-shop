import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux.js';
import { addToCart } from '../../../redux/cartRedux.js';

import styles from './Product.module.scss';
import { Button } from '../../common/Button/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Component = ({ className, products, addToCart, ...props }) => {

  const product = products.filter(product => product.id === props.match.params.id)[0];
  const defaultPrice = product.options.filter(option => option.default === true)[0].price;
  const defaultSize = product.options.filter(option => option.default === true)[0].size;
  //console.log('product', product);

  const [ size, setSize ] = useState(defaultSize);
  const [ price, setPrice ] = useState(defaultPrice);
  const [ qnty, setQnty ] = useState(1);
  const history = useHistory();

  const itemToCart = {
    id: product.id,
    name: product.name,
    image: product.image,
    ingredients: product.ingredients,
    size: size,
    priceSingle: price,
    quantity: qnty,
  };

  const total = itemToCart.priceSingle * itemToCart.quantity;

  const handleSizeChange = event => {
    setSize(event.target.id);
    setPrice(event.target.value);
  };

  const handleQntyChange = event => {
    setQnty(event.target.value);
  };

  const handleAddToCart = event => {
    event.preventDefault();
    addToCart(itemToCart);
    history.push('/');
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.wrapper)}
          lg={12}
          xl={11}
        >
          <div className={styles.content}>
            <Col className={styles.image_wrapper}
              xs={12}
              md={6}
            >
              <img className={clsx(styles.img)}
                src={product.image}
                alt={product.name}
              />
            </Col>

            <Col className={styles.details_wrapper}
              xs={12}
              md={6}
            >
              <h4 className={styles.details_title}>{product.name}</h4>
              <p className={styles.details_description}>{product.description}</p>
              <p className={styles.details_ingredients}>
                <span>ingredients: </span>
                {product.ingredients.join(', ')}.
              </p>

              <form>
                <p className={styles.details_size}>
                  <span>select size: </span>
                </p>
                <div className={styles.radios}>
                  {product.options.map(option => (
                    <div className={styles.radio} key={option.size}>
                      <label>
                        {`${option.size} ${option.price}$`}
                        <input
                          type='radio'
                          name='size'
                          id={option.size}
                          value={option.price}
                          label={`${option.size} ${option.price}$`}
                          defaultChecked={option.default}
                          onChange={handleSizeChange}
                        ></input>
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className={styles.details_quantity}>
                  <p>
                    <span>select quantity: </span>
                  </p>
                  <input
                    type='number'
                    name='quantity'
                    value={itemToCart.quantity}
                    onChange={handleQntyChange}
                    min={1}
                    max={10}
                    step={1}
                  ></input>
                </div>
              </form>

              <p className={styles.details_price}>
                <span>total: </span>
                {total}$
              </p>

              <Button className={styles.details_btn}
                variant='basic'
                onClick={handleAddToCart}
              >add to cart</Button>
            </Col>
          </div>
        </Col>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  products: PropTypes.array,
  addToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: arg => dispatch(addToCart(arg)),
});

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Product,
  ProductContainer as Product,
  Component as ProductComponent,
};
