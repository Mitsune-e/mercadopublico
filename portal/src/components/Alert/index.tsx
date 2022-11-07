import React from "react";
import classNames from "classnames";
import { Container, Icon, Text } from "./styles";

interface IProps {
  type: "success" | "danger" | "warning" | "info";

  className?: string;
  id?: string;

  icon?: JSX.Element;
  iconRight?: boolean;
}

export const Alert: React.FC<IProps> = ({ children, type, icon, iconRight, className, id }) => {
  const classes = classNames("alert", [`alert-${type}`], className);

  if (children) {
    return (
      <Container id={id} className={classes}>
        {icon && !iconRight && <Icon iconRight={iconRight}>{icon}</Icon>}

        <Text>{children}</Text>

        {icon && iconRight && <Icon iconRight={iconRight}>{icon}</Icon>}
      </Container>
    );
  } else return null;
};
