import React from 'react';
import { useRedirect } from '../../../../hooks/useRedirect';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from '../../../common/Button/Button';
import { OrderListItem } from '../../../features/OrderListItem/OrderListItem';

const Component = ({ isShow, size, price, quantity, name, image, onHide }) => {
  const pushHomepage = useRedirect('/');
  const pushCart = useRedirect('/cart');

  const handleClose = () => onHide();

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>You&apos;ve added {name} to your cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderListItem
          image={image}
          name={name}
          priceSingle={price}
          quantity={quantity}
          size={size}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='basic' onClick={pushCart}>
          Go to the cart
        </Button>
        <Button variant='dark' onClick={pushHomepage}>
          continiue shopping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Component.propTypes = {
  isShow: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  onHide: PropTypes.func,
};

export {
  Component as ProductModal,
  Component as ProductModuleComponent,
};
