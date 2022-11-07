export class JWTEntidade {
  constructor(options?: {
    Cnpj: string;
    Admin: boolean;
    Origem: number;
  }) {
    this.Cnpj = options.Cnpj;
    this.Admin = options.Admin;
    this.Origem = options.Origem;
  }

  public Cnpj: string;
  public Admin: boolean;
  public Origem: number;
}
