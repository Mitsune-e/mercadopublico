export function decimalFix(
  value: string | number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  type: "money" | "percent" | "text" = "money"
): string {
  try {

    let val = 0;
    if (value !== undefined && value !== null) {
      if (typeof value === "string") {
        val = Number(value);
      }
      else {
        val = value;
      }
    }

    const text = val.toLocaleString("pt-br", {
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits,
    });

    switch (type) {
      case "money": {
        return `R$ ${text}`;
      }
      case "percent": {
        return `${text}%`;
      }
      case "text": {
        return text;
      }
    }
  }
  catch (err) {
    console.log(err)
    return (`Houve um erro no processamento do número "${value}"`);
  }
}

export function decimalFixIfDecimal(
  value: string | number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  type: "money" | "percent" | "text" = "money"
): string {
  try {

    let val = 0;
    if (value !== undefined && value !== null) {
      if (typeof value === "string") {
        val = Number(value);
      }
      else {
        val = value;
      }
    }

    const isDecimal = val % 1 !== 0;

    if (isDecimal)
      return decimalFix(val, minimumFractionDigits, maximumFractionDigits, type);
    return decimalFix(val, 0, 0, type);
  }
  catch (err) {
    console.log(err)
    return (`Houve um erro no processamento do número "${value}"`);
  }
}