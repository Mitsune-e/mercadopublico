import React from "react";

import { Row, Label, LabelAlign, LabelPosition } from "..";
import { format, parseISO } from "date-fns";
import classNames from "classnames";
import { Container } from "./styles";

export type StaticFieldType = "text" | "money" | "date" | "percent";

interface IProps {
  value: string | number | Date | undefined;
  fontSize?: number;
  title?: string;
  fieldSize?: number;
  mask?: "cpf";
  type?: StaticFieldType;
  inline?: boolean;

  labelSize?: number;
  labelPosition?: LabelPosition;
  labelClassName?: string;

  fieldClassName?: string;
  tooltip?: string;
  tooltipColor?: string;
  labelAlign?: LabelAlign;
  id?: string;
}

export const StaticField: React.FC<IProps> = ({
  value,
  fontSize = 21,
  title,
  type,
  inline,

  labelSize,
  labelPosition = "left",
  labelClassName,

  fieldClassName,
  tooltip,
  tooltipColor,
  labelAlign = "right",
  id,
}) => {
  function parsePercent(val) {
    if (val === "NaN" || val === "" || val === undefined) val = "0,00";

    if (typeof val === "string")
      return `${parseFloat(val).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}%`;
    else
      return `${val.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}%`;
  }

  function parseMoney(val) {
    if (val === "NaN" || val === "") val = "0,00";

    if (typeof val === "string")
      return `R$ ${parseFloat(val).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    else
      return `R$ ${val.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
  }

  function parseDate(val: Date | string | null) {
    try {
      let parsedVal: Date;

      if (typeof val === "string") parsedVal = parseISO(val);
      else parsedVal = val;

      if (val) return format(parsedVal, "dd/MM/yyyy");
      else return "-";
    } catch {
      return val;
    }
  }

  function parseValue() {
    let formattedValue: string | number | Date = "";

    if (value && value !== "") formattedValue = value;

    if (type === "date") return parseDate(formattedValue as Date | null);
    else if (type === "money") return parseMoney(formattedValue);
    else if (type === "percent") return parsePercent(formattedValue);

    return formattedValue;
  }

  function renderField() {
    const value: string | number | Date = parseValue();

    const labelClasses = classNames({
      col: title,
      "form-control-plaintext": title,
      "ml-1": labelPosition === "left",
    }, fieldClassName);

    return <div id={id} dangerouslySetInnerHTML={{ __html: value.toString() }} className={labelClasses} />;
  }

  const containerClassName = classNames("form-group", {
    "col-md": inline,
  });

  if (labelPosition === "up") {
    return (
      <Container fontSize={fontSize} className={containerClassName}>
        {title && (
          <Label
            value={title}
            size={labelSize}
            labelPosition={labelPosition}
            className={labelClassName}
            tooltip={tooltip}
            tooltipColor={tooltipColor}
            labelAlign={labelAlign}
          />
        )}

        {renderField()}
      </Container>
    );
  }

  if (title) {
    return (
      <Container fontSize={fontSize} className={containerClassName}>
        <Row>
          {title && (
            <Label
              value={title}
              size={labelSize}
              labelPosition={labelPosition}
              className={labelClassName}
              tooltip={tooltip}
              tooltipColor={tooltipColor}
              labelAlign={labelAlign}
            />
          )}

          <div className={"col"}>{renderField()}</div>
        </Row>
      </Container>
    );
  }

  return renderField();
};
