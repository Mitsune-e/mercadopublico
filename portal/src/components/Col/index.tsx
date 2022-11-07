import React from "react";
import classNames from "classnames";

export interface IColProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export const Col: React.FC<IColProps> = ({ className, children, id }) => {
  const haveColClassName = className?.indexOf("col-") > -1;

  const classes = classNames({ col: !haveColClassName }, className);

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
};
