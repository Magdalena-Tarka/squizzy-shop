import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPersonalData, updateOrderForm } from '../../../../redux/orderRedux.js';

import styles from './PersonalDataForm.module.scss';
import { inputFields } from './config';
import { Input } from '../../../common/Input/Input';
import withValidation from '../../../../hoc/withValidation/withValidation';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Component = ({ ...props }) => {
  const {
    className,
    getUpdateAction,
    updateOrderForm,
    handleValidationEvents,
    handleValidationParams,
    handleFormName,
    personalData,
  } = props;

  useEffect(() => {
    handleFormName('orderForm');
    getUpdateAction(updateOrderForm);
  });

  const handleInputValue = field => personalData && personalData[field];

  const getWidth = (name) => {
    if (name === 'street') return 9;
    if (name === 'number') return 3;
    return 6;
  };

  return (
    <form
      id='orderForm'
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
              handleValidationEvents={handleValidationEvents}
              handleValidationParams={handleValidationParams}
              handleInputValue={handleInputValue}
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
  getUpdateAction: PropTypes.func,
  updateOrderForm: PropTypes.func,
  handleValidationEvents: PropTypes.func,
  handleFormName: PropTypes.func,
  handleValidationParams: PropTypes.func,
  personalData: PropTypes.object,
  handleInputValue: PropTypes.func,
};

const mapStateToProps = state => ({
  personalData: getPersonalData(state),
});

const mapDispatchToProps = dispatch => ({
  updateOrderForm: (field, value) => dispatch(updateOrderForm(field, value)),
});

const ComponentWrappedByHOC = withValidation(Component);
const Container = connect(mapStateToProps, mapDispatchToProps)(ComponentWrappedByHOC);

export {
  Container as PersonalDataForm,
  Component as PersonalDataFormComponent,
};
