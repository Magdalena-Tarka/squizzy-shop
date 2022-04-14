//import React from 'react';
import clsx from 'clsx';
import styles from './OrderListItem.module.scss';
import Col from 'react-bootstrap/Col';

interface IOrderListItem {
  image: string;
  name: string;
  note: string;
  priceSingle: number;
  quantity: number;
  size: string;
  className?: string;
}

const Component = ({ image, name, note, priceSingle, quantity, size, className}: IOrderListItem) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.orderListItem_img}>
      <img src={image} alt={name} />
    </div>

    <Col className={styles.orderListItem_description} sm={7}>
      <p className={styles.orderListItem_title}>{name}</p>
      <p className={styles.orderListItem_size}>{size}</p>
      {!note ? '' : (
        <p className={styles.orderListItem_note}>
          <span>your note: </span>{note}.
        </p>
      )}

    </Col>

    <Col className={styles.orderListItem_details}>
      <p className={styles.orderListItem_qnty}>{quantity}pcs</p>
      <p className={styles.orderListItem_price}>{priceSingle * quantity}$</p>
    </Col>

    {!note ? '' : (
      <p className={styles.orderListItem_note_XXSsize}>
        <span>your note: </span>{note}.
      </p>
    )}
  </div>
);

export {
  Component as OrderListItem,
  Component as OrderListItemComponent,
};
