import React from 'react';
import classNames from 'classnames';
import { Row, Label, LabelPosition } from '..';

interface IProps {
  value: any;
  onChange: any;

  name?: string;
  title?: string;
  fieldSize?: number;
  onBlur?: any;
  disabled?: boolean;
  inline?: boolean;

  labelSize?: number;
  labelPosition?: LabelPosition;
  labelClassName?: string;

  memberName?: string;
  memberValue?: string;
  data?: Array<any>;
  defaultValue?: any;
  emptyText?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export const ComboBox: React.FC<IProps> = (props) => {
  function onChange(e: any) {
    let value = e.target.value;

    if (typeof props.value === 'number') value = parseFloat(value);

    props.onChange(value);
  }

  function renderCombo() {
    //if (props.data.length > 0) {
    return (
      <div>
        <select id={props.id} name={props.name} className={'form-control'} onChange={onChange} value={props.value} disabled={props.disabled}>
          {props.emptyText && <option value={typeof props.value === "number" ? 0 : ""}>{props.emptyText}</option>}

          {props.data.map((opcao, index) => {
            if (props.memberValue && props.memberName)
              return (
                <option key={index} value={opcao[props.memberValue]}>
                  {opcao[props.memberName]}
                </option>
              );
            else
              return (
                <option key={index} value={opcao}>
                  {opcao}
                </option>
              );
          })}
        </select>
      </div>
    );
    // } else {
    //   return null;
    // }
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

        {renderCombo()}
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

          <div className={fieldClassName}>{renderCombo()}</div>
        </Row>
      </div>
    );
  }
};
