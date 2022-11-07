import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Button, ButtonType } from '../Button';

interface IProps {
  checked?: boolean;

  activeTitle?: string;
  inactiveTitle?: string;
  activeType?: ButtonType;
  inactiveType?: ButtonType;

  icon?: any;
  activeIcon?: any;
  inactiveIcon?: any;
  className?: string;
  id?: string;

  disabled?: boolean;
  block?: boolean;

  onChange?: (...args: any[]) => any;// eslint-disable-line no-unused-vars
}

export const ButtonSwitch: React.FC<IProps> = ({
  activeIcon = <FaCheck />,
  inactiveIcon = <FaTimes />,

  activeType = 'primary',
  inactiveType = 'dark',

  activeTitle,
  inactiveTitle,

  checked,

  onChange,

  className,
  id,
  ...rest
}) => {
  return (
    <Button
      id={id}
      onClick={onChange}
      type={checked ? activeType : inactiveType}
      title={checked ? activeTitle : inactiveTitle}
      icon={checked ? activeIcon : inactiveIcon}
      className={className}
      {...rest}
    />
  );
};
