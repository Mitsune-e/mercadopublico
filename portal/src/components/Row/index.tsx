import React from "react";
import classNames from "classnames";

export interface IRowProps {
  form?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export const Row: React.FC<IRowProps> = ({ form, className, children, id }) => {
  const classes = classNames({ "form-row": form }, "row", className);

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
};
