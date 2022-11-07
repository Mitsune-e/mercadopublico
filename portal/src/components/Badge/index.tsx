import React from "react";
import classNames from "classnames";

import { BadgeContainer } from "./styles";

export interface BadgeProps {
  type: "secondary" | "danger" | "info" | "warning" | "success";

  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, type = "secondary", ...rest }) => {
  const badgeClassNames = classNames("badge", [`alert-${type}`], className);

  return (
    <BadgeContainer className={badgeClassNames} {...rest}>
      {children}
    </BadgeContainer>
  );
};
