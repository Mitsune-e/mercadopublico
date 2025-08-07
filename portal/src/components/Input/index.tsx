import React, { useCallback, useState } from 'react';
import InputMaskField from 'react-input-mask';
import { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import { Row, Label, LabelPosition, ButtonType, Button } from '..';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ShowPasswordContainer } from './styles';
import { format, parse } from 'date-fns';
import { TextArea } from './TextArea';
import classNames from 'classnames';

export interface IInputProps {
  value: string | number;

  onChange?: any;
  name?: string;
  title?: string;
  fieldSize?: number;
  max?: number;
  rows?: number;
  mask?: InputMask | string;
  placeholder?: string;
  onBlur?: any;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  inline?: boolean;

  labelSize?: number;
  labelPosition?: LabelPosition;
  labelClassName?: string;

  group?: boolean;
  buttonLeft?: boolean;
  buttonTitle?: string;
  buttonType?: ButtonType;
  icon?: any;
  iconRight?: boolean;
  onButtonClick?: any;
  showPasswordButton?: boolean;

  id?: string;
}

export enum InputMask {
  cpf = '999.999.999-99',// eslint-disable-line no-unused-vars
  cep = '99999-999',// eslint-disable-line no-unused-vars
  mesAno = '99/9999'// eslint-disable-line no-unused-vars
}

export type InputType = 'textarea' | 'text' | 'email' | 'number' | 'date' | 'percent' | 'money' | 'password';

const Input: React.FC<IInputProps> = (props) => {
  const [ShowingPassword, setShowingPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowingPassword((oldValue) => !oldValue);
  }, []);

  const className = classNames({
    'form-control': !props.readonly,
    'form-control-plaintext': props.readonly
  });

  function mountDate(value: any) {
    return (
      <PatternFormat
        id={props.id}
        name={props.name}
        className={className}
        readOnly={props.readonly}
        format="##/##/####"
        mask="_"
        disabled={props.disabled}
        value={value}
        onValueChange={(e) => props.onChange(e.formattedValue, parse(e.formattedValue, 'dd/MM/yyyy', new Date()))}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    );
  }

  function mountPercent(value: any) {
    return (
      <NumericFormat
        id={props.id}
        name={props.name}
        className={className}
        readOnly={props.readonly}
        decimalSeparator=","
        decimalScale={2}
        suffix="%"
        fixedDecimalScale={true}
        disabled={props.disabled}
        value={value}
        onValueChange={(e) => props.onChange(e.formattedValue, e.floatValue)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    );
  }

  function mountTextarea(value: any) {
    return <TextArea {...props} value={value} />;
  }

  function mountMoney(value: any) {
    return (
      <NumericFormat
        id={props.id}
        name={props.name}
        className={className}
        readOnly={props.readonly}
        decimalScale={2}
        fixedDecimalScale={true}
        thousandSeparator={'.'}
        decimalSeparator={','}
        disabled={props.disabled}
        value={value}
        onValueChange={(e) => props.onChange(e.formattedValue, e.floatValue)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    );
  }

  function mountField(value: any): any {
    switch (props.type) {
      case 'date':
        return mountDate(value);
      case 'percent':
        return mountPercent(value);
      case 'textarea':
        return mountTextarea(value);
      case 'money':
        return mountMoney(value);
      default:
        return (
          <InputMaskField
            id={props.id}
            name={props.name}
            mask={InputMask[props.mask]}
            value={value}
            type={props.type}
            max={props.max}
            maxLength={props.max}
            className={className}
            readOnly={props.readonly}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
          />
        );
    }
  }

  function renderField() {
    const campoClasses = classNames({
      'input-group': props.group
    });

    let value = '';

    if (props.value) value = props.value.toString();

    if (typeof value === typeof Date) value = format(parse(value, 'dd/MM/yyyy', new Date()), 'dd/MM/yyyy');

    return (
      <div className={campoClasses}>
        {props.group && props.buttonLeft && <div className={'input-group-prepend'}>{renderGroupButton()}</div>}

        {mountField(value)}

        {props.group && !props.buttonLeft && <div className={'input-group-append'}>{renderGroupButton()}</div>}
      </div>
    );
  }

  function onButtonClick() {
    if (props.onButtonClick) props.onButtonClick();
  }

  function renderGroupButton() {
    return <Button title={props.buttonTitle} type={props.buttonType} onClick={onButtonClick} icon={props.icon} iconRight={props.iconRight} />;
  }

  const containerClassName = classNames('form-group', {
    'col-md': props.inline
  });

  if (props.labelPosition === 'up') {
    return (
      <div className={containerClassName}>
        {props.title && (
          <Label
            value={props.title}
            size={props.labelSize}
            labelPosition={props.labelPosition}
            className={props.labelClassName}
            required={props.required}
          />
        )}

        {renderField()}
      </div>
    );
  } else {
    const fieldClassName = classNames({
      col: !props.fieldSize,
      [`col-md-${props.fieldSize}`]: props.fieldSize
    });

    return (
      <div className={containerClassName}>
        <Row>
          {props.title && (
            <Label
              value={props.title}
              size={props.labelSize}
              labelPosition={props.labelPosition}
              className={props.labelClassName}
              required={props.required}
            />
          )}

          <div className={fieldClassName}>
            {renderField()}

            {props.type === 'password' && props.showPasswordButton && (
              <ShowPasswordContainer onClick={handleShowPassword}>
                {ShowingPassword && <FaEyeSlash />}

                {!ShowingPassword && <FaEye />}
              </ShowPasswordContainer>
            )}
          </div>
        </Row>
      </div>
    );
  }
};

Input.defaultProps = {
  type: 'text'
} as Partial<IInputProps>;

export { Input };
