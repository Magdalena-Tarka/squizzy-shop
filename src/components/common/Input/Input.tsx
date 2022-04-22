import { EventHandler, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';
import { IValidationRules , PersonalData} from '../../../types';

interface IInputProps {
  className?: string,
  type?: string,
  name: keyof PersonalData,
  label: string,
  validationRules?: IValidationRules,
  handleValidationEvents?: (e: SyntheticEvent, rules: IValidationRules) => void,
  handleValidationParams?: (field: string, param: string, rules?: IValidationRules) => boolean,
  handleInputValue?: (field: keyof PersonalData) => string,
}

const Component = ({className, ...props }: IInputProps) => {
  const {
    type = 'text',
    label,
    name,
    validationRules,
    handleValidationEvents,
    handleValidationParams,
    handleInputValue,
  } = props;

  const params = {
    isRequired: handleValidationParams && handleValidationParams(name, 'isRequired', validationRules),
    isTouched: handleValidationParams && handleValidationParams(name, 'isTouched'),
    isInvalid: handleValidationParams && handleValidationParams(name, 'isInvalid'),
    errorMsgs: handleValidationParams && handleValidationParams(name, 'errorMsgs'),
  };

  const eventHandler: EventHandler<SyntheticEvent> = (e: SyntheticEvent) => {
    //onChange && onChange(e);
    handleValidationEvents && validationRules && handleValidationEvents(e, validationRules);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <label htmlFor={name}>{label}{params.isRequired  && '*'}</label>
      <input
        className={clsx(params.isInvalid && params.isTouched && styles.warning)}
        type={type}
        id={name}
        name={name}
        onChange={eventHandler}
        onBlur={eventHandler}
        onFocus={eventHandler}
        value={handleInputValue && handleInputValue(name)}
      />
      <p className={clsx(params.isInvalid && params.isTouched && styles.warning, styles.errorMsg)}>
        {label} {params.errorMsgs}.
      </p>
    </div>
  );
};

export {
  Component as Input,
  Component as InputComponent,
};
