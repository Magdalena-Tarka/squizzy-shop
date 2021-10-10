import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { updateItemQnty, removeItem } from '../../../redux/cartRedux.js';

import styles from './CartProduct.module.scss';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Component = ({className, updateQnty, removeItem, ...props}) => {
  const {id, image, name, ingredients, priceSingle, quantity, size} = props;

  const [amountInput, setAmountInput] = useState(quantity);

  const handleInputChange = event => {
    setAmountInput(event.target.value);
    updateQnty(id, event.target.value);
  };

  const handleRemoveItem = event => {
    removeItem(id, size);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Col className={styles.cartProduct_img} sm={3}>
        <img src={image} alt={name} />
      </Col>

      <Col className={styles.cartProduct_description}
        xs={12}
        sm={7}
      >
        <h4 className={styles.cartProduct_title}>{name}</h4>
        <div>
          <p className={styles.cartProduct_ingredients}>
            <span>ingredients: </span>{ingredients.join(', ')}.
          </p>
          <p className={styles.cartProduct_size}>{size}</p>
        </div>

        <Button className={styles.cartProduct_btn}
          onClick={handleRemoveItem}
        ><i className="bi bi-trash-fill" />remove item</Button>
      </Col>

      <Col className={styles.cartProduct_details} sm={2}>
        <div className={styles.cartProduct_qnty}>
          <input
            type='number'
            name='quantity'
            id={id}
            value={amountInput}
            onChange={handleInputChange}
            min={1}
            max={10}
            step={1}
          ></input>
        </div>
        <p>{parseInt(priceSingle) * parseInt(amountInput)}$</p>
      </Col>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  ingredients: PropTypes.array,
  priceSingle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  updateQnty: PropTypes.func,
  removeItem: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  updateQnty: (id, value) => dispatch(updateItemQnty(id, value)),
  removeItem: (id, size) => dispatch(removeItem(id, size)),
});

const Container = connect(/*mapStateToProps, */null, mapDispatchToProps)(Component);

export {
  //Component as CartProduct,
  Container as CartProduct,
  Component as CartProductComponent,
};
