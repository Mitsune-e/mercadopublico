import { TYPE_IND_SITUACAO } from "../../domains";
import { WebFuncionalidade } from "../../entidades";

export class ParametrosEfetivador {
  public Funcionalidades: WebFuncionalidade[];
  public Situacoes: {
    Key: TYPE_IND_SITUACAO;
    Value: string;
  }[];
}

export class ParametrosBuscaEfetivador {
  public Funcionalidade: number;
  public Situacao: TYPE_IND_SITUACAO;
}
