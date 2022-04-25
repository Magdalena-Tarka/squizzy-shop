import { Dispatch, SyntheticEvent, useEffect } from 'react';

import clsx from 'clsx';

import { connect, ConnectedProps } from 'react-redux';
import { getPersonalData, updateOrderForm } from '../../../../redux/orderRedux';

import styles from './PersonalDataForm.module.scss';
import { inputFields } from './config';
import { Input } from '../../../common/Input/Input';
import withValidation from '../../../../hoc/withValidation/withValidation';
import { IInitialState, IValidationRules, PersonalData } from '../../../../types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AnyAction } from 'redux';

interface IOwnProps {
  className?: string,
  getUpdateAction?: (action: (field: string, value: string) => void) => (field: string, value: string) => void,
  updateOrderForm?: (field: string, value: string) => void,
  handleValidationEvents?: (e: SyntheticEvent, rules: IValidationRules) => void,
  handleFormName?: (formName: string) => void,
  handleValidationParams?: (field: string, param: string, rules?: IValidationRules) => boolean,
  handleInputValue?: (field: keyof PersonalData) => string,
}

const Component = ({ ...props }: Props) => {
  const {
    className,
    personalData,
    getUpdateAction,
    updateOrderForm,
    handleValidationEvents,
    handleValidationParams,
    handleFormName,
  } = props;

  useEffect(() => {
    handleFormName && handleFormName('orderForm');
    getUpdateAction && getUpdateAction(updateOrderForm);
  });

  const handleInputValue = (field: keyof PersonalData): string => personalData && personalData[field];

  const getWidth = (name: string) => {
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
            />
          </Col>
        ))}
      </Row>
    </form>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  personalData: getPersonalData(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  updateOrderForm: (field: string, value: string) => dispatch(updateOrderForm(field, value)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IOwnProps;

const ComponentWrappedByHOC = withValidation(Component);
const Container = connector(ComponentWrappedByHOC);

export {
  Container as PersonalDataForm,
  Component as PersonalDataFormComponent,
};
