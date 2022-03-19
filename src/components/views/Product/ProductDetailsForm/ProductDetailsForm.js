import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductDetailsForm.module.scss';

const Component = ({className, onQuantity, onOption, options}) => {

  const handleChange = (event, option) => {
    if(option) {
      onOption(option);
    } else {
      onQuantity(parseInt(event.target.value));
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <form>
        <p className={styles.details_size}>
          <span>select size: </span>
        </p>
        <div className={styles.radios}>
          {options.map(option => (
            <div className={styles.radio} key={option.size}>
              <label>
                {`${option.size} ${option.price}$`}
                <input
                  type='radio'
                  name='size'
                  id={option.size}
                  value={option}
                  label={`${option.size} ${option.price}$`}
                  defaultChecked={option.default}
                  onChange={event => handleChange(event, option)}
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
            defaultValue={1}
            onChange={handleChange}
            min={1}
            max={10}
            step={1}
          ></input>
        </div>
      </form>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  options: PropTypes.array,
  onQuantity: PropTypes.func,
  onOption: PropTypes.func,
};

export {
  Component as ProductDetailsForm,
  Component as ProductDetailsFormComponent,
};
