import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from '../../../common/Button/Button';
import { OrderListItem } from '../../../features/OrderListItem/OrderListItem';

const Component = ({ isShow, size, price, qnty, name, image, onHide }) => {
  const history = useHistory();

  const handleClose = () => onHide();

  const handleRedirect = (path) => {
    onHide();
    history.push(path);
  };

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
          quantity={qnty}
          size={size}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='basic' onClick={() => handleRedirect('/cart')}>
          Go to the cart
        </Button>
        <Button variant='dark' onClick={() => handleRedirect('/')}>
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
  qnty: PropTypes.number,
  onHide: PropTypes.func,
};

export {
  Component as ProductModal,
  Component as ProductModuleComponent,
};
