export class IdentificacaoEntidade {
  constructor(req: any) {
    this.ip = req.socket.remoteAddress;;
    let userAgent: string = req.headers['user-agent'];
    if (userAgent.length > 100)
      userAgent = userAgent.substring(0, 100);

    this.userAgent = userAgent;
  }

  public ip: string;
  public userAgent: string;
}