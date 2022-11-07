import { ItemTransacaoEntidade } from ".";

export class WebProtocoloEntidade {
  public OID_PROTOCOLO: number;
  public OID_FUNCIONALIDADE: number;
  public COD_IDENTIFICADOR: string;
  public DTA_SOLICITACAO: Date;
  public DTA_EFETIVACAO: Date;
  public TXT_MOTIVO_RECUSA: string;
  public TXT_TRANSACAO: string;
  public TXT_TRANSACAO2: string;
  public TXT_USUARIO_SOLICITACAO: string;
  public TXT_USUARIO_EFETIVACAO: string;
  public TXT_IPV4: string;
  public TXT_IPV6: string;
  public TXT_DISPOSITIVO: string;
  public TXT_ORIGEM: string;
  public DES_SITUACAO: string;
  public DES_FUNCIONALIDADE: string;
  public ListaTransacao?: Array<ItemTransacaoEntidade>;
}