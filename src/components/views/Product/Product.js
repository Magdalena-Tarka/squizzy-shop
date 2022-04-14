import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, fetchOneFromAPI } from '../../../redux/productsRedux.js';
import { addToCart } from '../../../redux/cartRedux.js';

import styles from './Product.module.scss';
import { Button } from '../../common/Button/Button';
import { ProductDetailsForm } from './ProductDetailsForm/ProductDetailsForm';
import { ProductModal } from './ProductModal/ProductModal';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Component = ({ className, product, addToCart, fetchOneFromAPI, ...props }) => {
  const defaultPrice = product && product.options.filter(option => option.default)[0].price;
  const defaultSize = product && product.options.filter(option => option.default)[0].size;

  const [ size, setSize ] = useState(defaultSize);
  const [ price, setPrice ] = useState(defaultPrice);
  const [ quantity, setQuantity ] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchOneFromAPI(props.match.params.id);
  }, [fetchOneFromAPI, props.match.params.id]);

  useEffect(() => {
    setSize(defaultSize);
    setPrice(defaultPrice);
  }, [defaultSize, defaultPrice]);

  const total = price * quantity;

  const handleChange = (value) => {
    if(typeof value === 'object') {
      setSize(value.size);
      setPrice(value.price);
    } else setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      ingredients: product.ingredients,
      size,
      priceSingle: price,
      quantity,
    });
    setShow(true);
  };

  const setShowFalse = () => setShow(false);

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

                <ProductDetailsForm
                  size={size}
                  price={price}
                  quantity={quantity}
                  onQuantity={handleChange}
                  onOption={handleChange}
                  options={product.options}
                />

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
          <ProductModal
            name={product.name}
            image={product.image}
            isShow={show}
            size={size}
            price={price}
            quantity={quantity}
            onHide={setShowFalse}
          />
        )}
      </Container>
    </div>
  );
};

Component.propTypes = {
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
