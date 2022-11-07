import React from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";
import { v4 } from "uuid";

import { Container, Tooltip } from "./styles";
import classNames from "classnames";

export type LabelPosition = "left" | "up";
export type LabelAlign = "left" | "right";

interface IProps {
  value: string;

  name?: string;
  required?: boolean;
  labelPosition?: LabelPosition;
  size?: number;
  className?: string;
  tooltip?: string;
  tooltipColor?: string;
  labelAlign?: LabelAlign;
}

export const Label: React.FC<IProps> = ({
  value,
  name,
  required,
  labelPosition = "left",
  size,
  className,
  tooltip,
  tooltipColor = "#000",
  labelAlign = "right",
}) => {
  const id = v4();

  const cima = labelPosition === "up";

  const labelClasses = classNames(
    { "col-sm-2": !size && !cima },
    { [`col-lg-${size}`]: size && !cima },
    { "col-form-label": !cima },
    { "text-lg-right": !cima && labelAlign !== "left" },
    { "text-left": labelAlign === "left" },
    className
  );

  return (
    <Container id={id} className={labelClasses} htmlFor={name}>
      {required && <span className="text-danger">* </span>}
      {tooltip && (
        <>
          <Tooltip color={tooltipColor} data-tip data-for={id}>
            <FaQuestionCircle />
          </Tooltip>

          <ReactTooltip place="top" type="dark" effect="solid" id={id}>
            {tooltip}
          </ReactTooltip>
        </>
      )}
      {value}
      {":"}
    </Container>
  );
};
