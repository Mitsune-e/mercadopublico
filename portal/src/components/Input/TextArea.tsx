import React from "react";

interface IProps {
  value: string | number;

  onChange?: any;
  name?: string;
  max?: number;
  rows?: number;
  placeholder?: string;
  onBlur?: any;
  disabled?: boolean;
  id?: string;
}

export const TextArea: React.FC<IProps> = (props) => {
  return (
    <textarea
      name={props.name}
      id={props.id}
      disabled={props.disabled}
      className={"form-control"}
      rows={props.rows}
      placeholder={props.placeholder}
      value={props.value}
      maxLength={props.max}
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
    ></textarea>
  );
};
