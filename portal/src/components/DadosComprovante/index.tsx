import React from "react";
import { WebProtocoloEntidade } from "@entidades";
import { ConteudoTransacao } from "./ConteudoTransacao";
import { DadosTecnicos } from "./DadosTecnicos";
import { DadosTransacao } from "./DadosTransacao";

export interface IDadosComprovateProps {
  Comprovante: WebProtocoloEntidade;
  FontSize: number;
  LabelPosition: "up" | "left";
}

export * from "./DadosTransacao";
export * from "./DadosTecnicos";
export * from "./ConteudoTransacao";

export const DadosComprovante: React.FC<IDadosComprovateProps> = ({
  Comprovante,
  FontSize,
  LabelPosition
}) => {
  return (
    <>
      <DadosTransacao
        Comprovante={Comprovante}
        FontSize={FontSize}
        LabelPosition={LabelPosition}
      />

      <ConteudoTransacao
        Comprovante={Comprovante}
        FontSize={FontSize}
        LabelPosition={LabelPosition}
      />

      <DadosTecnicos
        Comprovante={Comprovante}
        FontSize={FontSize}
        LabelPosition={LabelPosition}
      />
    </>
  );
}