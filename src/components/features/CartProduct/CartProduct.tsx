import { useState, ChangeEventHandler, MouseEventHandler, ChangeEvent } from 'react';
import clsx from 'clsx';
import { connect, ConnectedProps } from 'react-redux';
import { updateItemQuantity, updateItemNote, removeItem } from '../../../redux/cartRedux';
import styles from './CartProduct.module.scss';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AnyAction, Dispatch } from 'redux';

interface IOwnProps {
  className: string;
  _id: string,
  image: string,
  name: string,
  note: string,
  ingredients: string[],
  priceSingle: number,
  quantity: number,
  size: string,
}

const Component = ({
  className,
  _id,
  image,
  name,
  note,
  ingredients,
  priceSingle,
  quantity,
  size,
  updateQuantity,
  updateNote,
  removeItem,
}: Props) => {

  const [amountInput, setAmountInput] = useState(quantity);
  const [noteInput, setNotetInput] = useState('');
  console.log('noteInput:', noteInput);

  const handleInputAmount: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmountInput(parseInt(event.currentTarget.value));
    updateQuantity(_id, size, parseInt(event.target.value));
  };

  const handleInputNote: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNotetInput(event.currentTarget.value);
    updateNote(_id, size, event.target.value);
  };

  const handleRemoveItem: MouseEventHandler = () => {
    removeItem(_id, size);
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

        <textarea className={styles.cartProduct_textarea}
          name='note'
          id='note'
          placeholder='You can add some note...'
          maxLength={70}
          value={note}
          onChange={handleInputNote}
        ></textarea>
      </Col>

      <Col className={styles.cartProduct_details} sm={2}>
        <p>{priceSingle * amountInput}$</p>
        <div className={styles.cartProduct_quantity}>
          <input
            type='number'
            name='quantity'
            id='quantity'
            value={quantity}
            onChange={handleInputAmount}
            min={1}
            max={10}
            step={1}
          ></input>
        </div>
        <Button className={styles.cartProduct_btn} onClick={handleRemoveItem}>
          <i className="bi bi-trash-fill" />
          remove
        </Button>
      </Col>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  updateQuantity: (id: string, size: string, quantity: number) => dispatch(updateItemQuantity(id, size, quantity)),
  updateNote: (id: string, size: string, note: string) => dispatch(updateItemNote(id, size, note)),
  removeItem: (id: string, size: string) => dispatch(removeItem(id, size)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IOwnProps;

const Container = connector(Component);

export {
  Container as CartProduct,
  Component as CartProductComponent,
};
