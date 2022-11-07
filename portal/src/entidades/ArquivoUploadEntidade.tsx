export class ArquivoUploadEntidade {
  public OID_ARQUIVO_UPLOAD: number;
  public NOM_ARQUIVO_ORIGINAL: string;
  public NOM_EXT_ARQUIVO: string;
  public DTA_UPLOAD: string;
  public NOM_DIRETORIO_LOCAL: string;
  public NOM_ARQUIVO_LOCAL: string;
  public OID_USUARIO?: number;
  public OID_SERVICO?: number;
  public OID_MODULO?: number;
  public OID_SISTEMA?: number;
  public IND_STATUS: number;
}