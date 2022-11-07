export class ItemTransacaoEntidade {
  constructor(options?: {
    Titulo: string;
    Valor: string;
  }) {
    this.Titulo = options.Titulo;
    this.Valor = options.Valor;
  }

  public Titulo: string;
  public Valor: string;
}
