import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, fetchOneFromAPI } from '../../../redux/productsRedux.js';
import { addToCart } from '../../../redux/cartRedux.js';

import styles from './Product.module.scss';
import { Button } from '../../common/Button/Button';
import { OrderListItem } from '../../features/OrderListItem/OrderListItem';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const Component = ({ className, product, addToCart, fetchOneFromAPI, ...props }) => {

  const defaultPrice = product && product.options.filter(option => option.default === true)[0].price;
  const defaultSize = product && product.options.filter(option => option.default === true)[0].size;

  const [ size, setSize ] = useState(defaultSize);
  const [ price, setPrice ] = useState(defaultPrice);
  const [ qnty, setQnty ] = useState(1);
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchOneFromAPI(props.match.params.id);
    setSize(defaultSize);
    setPrice(defaultPrice);
  }, [fetchOneFromAPI, props.match.params.id, defaultSize, defaultPrice]);

  const itemToCart = {
    _id: product && product._id,
    name: product && product.name,
    image: product && product.image,
    ingredients: product && product.ingredients,
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
    setShow(true);
  };

  const handleGoToCart = event => {
    setShow(false);
    history.push('/cart');
  };

  const handleContinue = event => {
    setShow(false);
    history.push('/');
  };

  const handleClose = () => setShow(false);

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <Col className={clsx('glassEffect', styles.wrapper)}
          lg={12}
          xl={11}
        >
          {!product ? (
            <div className={styles.content}>
              <p>Loading...</p>
            </div>
          ) : (
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

                <Button className={styles.details_btn} onClick={handleAddToCart}>
                  add to cart
                </Button>
              </Col>
            </div>
          )}
        </Col>

        {product && (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>You&apos;ve added {product.name} to your cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <OrderListItem
                image={product.image}
                name={product.name}
                priceSingle={price}
                quantity={qnty}
                size={size}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleGoToCart}>
                Go to the cart
              </Button>
              <Button variant='dark' onClick={handleContinue}>
                continiue shopping
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  product: PropTypes.object,
  addToCart: PropTypes.func,
  fetchOneFromAPI: PropTypes.func,
};

const mapStateToProps = state => ({
  product: getOne(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: arg => dispatch(addToCart(arg)),
  fetchOneFromAPI: id => dispatch(fetchOneFromAPI(id)),
});

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Product,
  ProductContainer as Product,
  Component as ProductComponent,
};
