import React from "react";
import { Box, StaticField } from "@components";
import { IDadosComprovateProps } from "..";
import { SITUACAO, SITUACAO_COR, TYPE_IND_SITUACAO } from "@domains";
import { dateFormat } from "@helpers/date";

export const DadosTransacao: React.FC<IDadosComprovateProps> = ({
  Comprovante,
  FontSize,
  LabelPosition
}) => {

  return (
    <Box title="Dados da Transação">
      <StaticField
        fontSize={FontSize}
        title={"Nome da Transação"}
        value={Comprovante.DES_FUNCIONALIDADE}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Situação"}
        value={SITUACAO(Comprovante.DES_SITUACAO as TYPE_IND_SITUACAO).Value}
        labelSize={3}
        labelPosition={LabelPosition}
        fieldClassName={`text-${SITUACAO_COR[Comprovante.DES_SITUACAO]}`}
      />

      <StaticField
        fontSize={FontSize}
        title={"Número de Protocolo"}
        value={Comprovante.COD_IDENTIFICADOR}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Data da Solicitação"}
        value={dateFormat(Comprovante.DTA_SOLICITACAO, "dd/MM/yyyy hh:mm:ss")}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Solicitado por"}
        value={Comprovante.TXT_USUARIO_SOLICITACAO}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Data da Efetivação"}
        value={dateFormat(Comprovante.DTA_EFETIVACAO, "dd/MM/yyyy hh:mm:ss") ?? '-'}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Efetivado por"}
        value={Comprovante.TXT_USUARIO_EFETIVACAO ?? '-'}
        labelSize={3}
        labelPosition={LabelPosition}
      />

      <StaticField
        fontSize={FontSize}
        title={"Motivo da Recusa"}
        value={Comprovante.TXT_MOTIVO_RECUSA}
        labelSize={3}
        labelPosition={LabelPosition}
      />
    </Box>
  );
}