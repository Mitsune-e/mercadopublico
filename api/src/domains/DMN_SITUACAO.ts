export const DMN_SITUACAO = {
  SOLICITADO: 'SOL' as TYPE_IND_SITUACAO,
  EFETIVADO: 'EFE' as TYPE_IND_SITUACAO,
  RECUSADO: 'REC' as TYPE_IND_SITUACAO
}

export const SITUACOES = [
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

export type TYPE_IND_SITUACAO = 'SOL' | 'EFE' | 'REC';
