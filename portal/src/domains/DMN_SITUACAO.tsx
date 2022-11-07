export const DMN_SITUACAO = {
  SOLICITADO: 'SOL' as TYPE_IND_SITUACAO,
  EFETIVADO: 'EFE' as TYPE_IND_SITUACAO,
  RECUSADO: 'REC' as TYPE_IND_SITUACAO
}

export const SITUACOES = [
  {
    Key: null,
    Value: "Todas"
  },
  {
    Key: DMN_SITUACAO.SOLICITADO,
    Value: "Solicitado"
  },
  {
    Key: DMN_SITUACAO.EFETIVADO,
    Value: "Efetivado"
  },
  {
    Key: DMN_SITUACAO.RECUSADO,
    Value: "Recusado"
  }
]

export function SITUACAO(situacao: TYPE_IND_SITUACAO): {
  Key: TYPE_IND_SITUACAO;
  Value: string;
} {
  return (
    SITUACOES.filter(x => x.Key === (situacao))[0]
  );
}

export const SITUACAO_COR = {
  [DMN_SITUACAO.SOLICITADO]: "info",
  [DMN_SITUACAO.EFETIVADO]: "success",
  [DMN_SITUACAO.RECUSADO]: "danger"
}

export type TYPE_IND_SITUACAO = 'SOL' | 'EFE' | 'REC' | null;
