import React from "react";
import { Box, StaticField } from "@components";
import { IDadosComprovateProps } from "..";

export const ConteudoTransacao: React.FC<IDadosComprovateProps> = ({
  Comprovante,
  FontSize,
  LabelPosition
}) => {
  return (
    <Box title={"Conteúdo da Transação"}>
      {Comprovante.ListaTransacao && Comprovante.ListaTransacao.map((itemTransacao, index) => (
        <StaticField
          fontSize={FontSize}
          key={index}
          title={itemTransacao.Titulo}
          value={itemTransacao.Valor}
          labelSize={3}
          labelPosition={LabelPosition}
        />
      ))}
    </Box>
  );
}