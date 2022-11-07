import { format } from "date-fns";
import { query } from ".";
import { DMN_SITUACAO } from "../domains";
import { IdentificacaoEntidade, ItemTransacaoEntidade, JWTEntidade, WebOrigem, WebProtocoloEntidade } from "../entidades";

export function montarCodigo(cnpj: string) {
  return (format(new Date(), "yyyyMMddhhmm") + cnpj)
}

export class Protocolo {
  constructor() {
    this.ListaConteudo = new Array<ItemTransacaoEntidade>();
    this.Conteudo = "";
  }
  private ListaConteudo: Array<ItemTransacaoEntidade>;
  private Conteudo: string;
  private Protocolo: string;

  AdicionarItem = (titulo: string, valor: string) => {
    const item: ItemTransacaoEntidade = {
      Titulo: titulo,
      Valor: valor
    };

    this.ListaConteudo.push(item);
  }

  MontarConteudo = () => {
    let conteudo = "";

    this.ListaConteudo.forEach((item: ItemTransacaoEntidade) => {
      conteudo = conteudo + `${item.Titulo}|${item.Valor}#NR`;
    });

    this.Conteudo = conteudo;
  }

  DesmontarConteudo = () => {
    const listaConteudo = new Array<ItemTransacaoEntidade>();

    const transacao = this.Conteudo.split("#NR");

    transacao.forEach(item => {
      const itens = item.split("|");
      const itemTransacao: ItemTransacaoEntidade = {
        Titulo: itens[0],
        Valor: itens[1]
      };

      listaConteudo.push(itemTransacao);
    });

    this.ListaConteudo = listaConteudo;
  }

  Criar = async (req: any, oidFuncionalidade: number): Promise<boolean> => {
    const user: JWTEntidade = req.user;
    const identificador = new IdentificacaoEntidade(req);
    const buscaDominio = await query<WebOrigem>(`SELECT COD_ORIGEM, DS_ORIGEM FROM WEB_ORIGEM WHERE COD_ORIGEM = ${user.Origem}`);
    const origem = buscaDominio.recordset[0];

    const protocolo = montarCodigo(user.Cnpj);

    let conteudo1 = this.Conteudo;
    let conteudo2 = "";

    if (conteudo1.length > 4000) {
      conteudo1 = conteudo1.substring(0, 4000);
      conteudo2 = conteudo1.substring(4000);
    }

    const result = await query(`INSERT INTO WEB_PROTOCOLO (
      OID_FUNCIONALIDADE,
      COD_IDENTIFICADOR,
      DTA_SOLICITACAO,
      DTA_EFETIVACAO,
      TXT_MOTIVO_RECUSA,
      TXT_TRANSACAO,
      TXT_TRANSACAO2,
      TXT_USUARIO_SOLICITACAO,
      TXT_USUARIO_EFETIVACAO,
      TXT_IPV4,
      TXT_IPV6,
      TXT_DISPOSITIVO,
      TXT_ORIGEM,
      DES_SITUACAO) 
    VALUES (
      ${oidFuncionalidade},
      '${protocolo}',
      GETDATE(),
      NULL,
      NULL,
      '${conteudo1}',
      '${conteudo2}',
      '${user.Cnpj}',
      NULL,
      '${identificador.ip}',
      '${identificador.ip}',
      '${identificador.userAgent}',
      '${origem.DS_ORIGEM}',
      '${DMN_SITUACAO.SOLICITADO}')`);

    const sucesso = (result.rowsAffected[0] > 0);

    this.Protocolo = protocolo;

    return sucesso;
  }

  BuscarProtocolo = async () => {
    const result = await query<WebProtocoloEntidade>(`SELECT OID_PROTOCOLO, OID_FUNCIONALIDADE, COD_IDENTIFICADOR, DTA_SOLICITACAO, DTA_EFETIVACAO, TXT_MOTIVO_RECUSA, TXT_TRANSACAO, TXT_TRANSACAO2, TXT_USUARIO_SOLICITACAO, TXT_USUARIO_EFETIVACAO, TXT_IPV4, TXT_IPV6, TXT_DISPOSITIVO, TXT_ORIGEM, DES_SITUACAO FROM WEB_PROTOCOLO WHERE COD_IDENTIFICADOR = '${this.Protocolo}'`);
    const protocolo = result.recordset[0];
    return protocolo;
  }

  BuscarProtocoloPorOid = async (oidProtocolo: number) => {
    const select = `SELECT OID_PROTOCOLO, OID_FUNCIONALIDADE, COD_IDENTIFICADOR, DTA_SOLICITACAO, DTA_EFETIVACAO, TXT_MOTIVO_RECUSA, TXT_TRANSACAO, TXT_TRANSACAO2, TXT_USUARIO_SOLICITACAO, TXT_USUARIO_EFETIVACAO, TXT_IPV4, TXT_IPV6, TXT_DISPOSITIVO, TXT_ORIGEM, DES_SITUACAO FROM WEB_PROTOCOLO WHERE OID_PROTOCOLO = ${oidProtocolo}`;

    const result = await query<WebProtocoloEntidade>(select);
    const protocolo = result.recordset[0];
    this.Protocolo = protocolo.COD_IDENTIFICADOR
    this.Conteudo = protocolo.TXT_TRANSACAO + protocolo.TXT_TRANSACAO2;
  }

  BuscarListaConteudo = () => this.ListaConteudo;
}