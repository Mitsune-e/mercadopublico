import React from "react";
import { Box, StaticField } from "@components";
import { IDadosComprovateProps } from "..";

export const DadosTecnicos: React.FC<IDadosComprovateProps> = ({
  Comprovante,
  FontSize,
  LabelPosition
}) => {
  return (
    <Box title={"Dados Técnicos"}>
      <StaticField
        fontSize={FontSize}
        title={"Endereço IPV4"}
        value={Comprovante.TXT_IPV4}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Endereço IPV6"}
        value={Comprovante.TXT_IPV6}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Dispositivo"}
        value={Comprovante.TXT_DISPOSITIVO}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Origem"}
        value={Comprovante.TXT_ORIGEM}
        labelSize={3}
        labelPosition={LabelPosition}
      />
    </Box>
  );
}