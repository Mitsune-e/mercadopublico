import React, { useState } from "react";
import classNames from "classnames";
import { FaSpinner } from "react-icons/fa";
import { Icon, Container, Content, Text } from "./styles";

enum ButtonSize {// eslint-disable-line no-unused-vars
  large = "btn-lg",// eslint-disable-line no-unused-vars
  normal = "btn-md",// eslint-disable-line no-unused-vars
  small = "btn-sm",// eslint-disable-line no-unused-vars
  mini = "btn-xs",// eslint-disable-line no-unused-vars
}

export type ButtonType = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";

export interface IButtonProps {
  onClick: (...args: any[]) => any;// eslint-disable-line no-unused-vars

  title?: string;
  type?: ButtonType;
  disabled?: boolean;
  block?: boolean;
  outline?: boolean;
  submit?: boolean;
  usesLoading?: boolean;
  loadingText?: string;
  className?: string;
  size?: "large" | "normal" | "small" | "mini";
  style?: any;
  icon?: JSX.Element;
  iconRight?: boolean;
  borderless?: boolean;
  id?: string;
}

export const Button: React.FC<IButtonProps> = ({
  type = "default",
  size = "normal",
  submit,
  outline,
  block,
  borderless,
  title,
  disabled,

  icon,
  iconRight,

  usesLoading,
  loadingText,
  onClick,

  className,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  const classes = classNames(
    "btn",
    { [`btn-${type}`]: !outline },
    { [`btn-outline-${type}`]: outline },
    { "btn-block": block },
    { "btn-borderless": borderless },

    ButtonSize[size],

    className
  );

  const handleOnClick = async (e: any) => {
    e.preventDefault();

    if (usesLoading) setLoading(true);

    await onClick();

    if (usesLoading) setLoading(false);
  };

  return (
    <Container id={id} type={submit ? "submit" : "button"} className={classes} onClick={handleOnClick} disabled={disabled || loading}>
      <Content>
        {usesLoading && loading && (
          <>
            <Icon>
              <FaSpinner className="icon-spin" />
            </Icon>

            {loadingText && <Text className="btn-text">{loadingText}</Text>}
          </>
        )}

        {!loading && (
          <>
            {icon && !iconRight && <Icon iconRight={iconRight}>{icon}</Icon>}

            {!loading && title && <Text className="btn-text">{title}</Text>}

            {icon && iconRight && <Icon iconRight={iconRight}>{icon}</Icon>}
          </>
        )}
      </Content>
    </Container>
  );
};
