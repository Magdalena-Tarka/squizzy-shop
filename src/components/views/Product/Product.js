import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux.js';
import { addToCart } from '../../../redux/cartRedux.js';

import styles from './Product.module.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Col className={clsx('glassEffect', styles.product_wrapper)}
          xs={11}
          sm={12}
          lg={11}
        >
          <Card className={styles.product_card}>
            <Card.Body className={clsx('g-4', styles.card_body)}>
              <Row className={styles.row}
              >
                <Col className={styles.card_image}
                  xs={12}
                  sm={6}
                >
                  <img className={clsx(styles.img)}
                    src={product.image}
                    alt={product.name}
                  />
                </Col>

                <Col className={styles.card_details}
                  xs={12}
                  sm={6}
                >
                  <Card.Title className={styles.card_title}>{product.name}</Card.Title>
                  <Card.Text className={styles.card_description}>{product.description}</Card.Text>
                  <Card.Text className={styles.card_ingredients}>
                    <span>ingredients: </span>
                    {product.ingredients.join(', ')}.
                  </Card.Text>

                  <Form>
                    <Card.Text className={styles.card_size}>
                      <span> select size: </span>
                    </Card.Text>
                    <Form.Group className={styles.radios}>
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
                    </Form.Group>

                    <Form.Group className={styles.card_quantity}>
                      <Card.Text>
                        <span>select quantity: </span>
                      </Card.Text>
                      <input
                        type='number'
                        name='quantity'
                        value={itemToCart.quantity}
                        onChange={handleQntyChange}
                        min={1}
                        max={10}
                        step={1}
                      ></input>
                    </Form.Group>
                  </Form>

                  <Card.Text className={styles.card_price}>
                    <span>total: </span>
                    {total}$
                  </Card.Text>

                  <Button className={styles.card_btn}
                    type="button"
                    variant="warning"
                    onClick={handleAddToCart}
                  >add to cart</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
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
