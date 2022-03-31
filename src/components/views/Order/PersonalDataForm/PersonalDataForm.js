import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { updateOrderForm } from '../../../../redux/orderRedux.js';

import styles from './PersonalDataForm.module.scss';
import { inputFields } from './config';
import { Input } from '../../../common/Input/Input';
import withValidation from '../../../../hoc/withValidation';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Component = ({ ...props }) => {
  const {
    className,
    handleChange,
    handleBlur,
    handleFocus,
    handleIsRequired,
    handleIsTouched,
    handleIsInvalid,
    getUpdateAction,
    updateOrderForm,
  } = props;

  const form = 'orderForm';

  const getWidth = (name) => {
    if (name === 'street') return 9;
    if (name === 'number') return 3;
    return 6;
  };

  return (
    <form
      className={clsx(className, styles.orderForm)}
      autoComplete='off'
    >
      <Row className={styles.row}>
        {inputFields.map((field, index) => (
          <Col className={styles.inputWrapper}
            xs={12}
            sm={getWidth(field.name)}
            key={index}
          >
            <Input
              {...field}
              onChange={handleChange}
              onBlur={() => handleBlur(form, field.name, field.validationRules)}
              onFocus={() => handleFocus(form, field.name)}
              isRequired={handleIsRequired(field.validationRules)}
              isInvalid={handleIsInvalid(field.name)}
              isTouched={handleIsTouched(field.name)}
              getUpdateAction={getUpdateAction(updateOrderForm)}
            />
          </Col>
        ))}
      </Row>
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleIsRequired: PropTypes.func,
  handleIsTouched: PropTypes.func,
  handleIsInvalid: PropTypes.func,
  getUpdateAction: PropTypes.func,
  updateOrderForm: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  updateOrderForm: arg => dispatch(updateOrderForm(arg)),
});

const ComponentWrappedByHOC = withValidation(Component);
const Container = connect(null, mapDispatchToProps)(ComponentWrappedByHOC);

export {
  Container as PersonalDataForm,
  Component as PersonalDataFormComponent,
};
