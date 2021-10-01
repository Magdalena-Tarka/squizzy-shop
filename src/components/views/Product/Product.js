import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll/*, reduxActionCreator*/ } from '../../../redux/productsRedux.js';

import styles from './Product.module.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Component = ({ className, products, ...props }) => {

  const product = products.filter(product => product.id === props.match.params.id)[0];
  const defaultPrice = product.options.filter(option => option.default === true)[0].price;
  //console.log('product', product);

  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(defaultPrice);

  const total = price * amount;

  const changeAmount = event => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const changePrice = event => {
    event.preventDefault();
    setPrice(event.target.value);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>

        <Col className={styles.product_wrapper}
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
                    alt={product.image}
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
                              //checked={defaultPrice}
                              //checked={parseInt(price) === parseInt(option.price)}
                              onChange={changePrice}
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
                        value={amount}
                        onChange={changeAmount}
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
};

const mapStateToProps = state => ({
  products: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ProductContainer = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Product,
  ProductContainer as Product,
  Component as ProductComponent,
};
