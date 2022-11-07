import * as ReactService from "./ReactService";

class LGPD extends ReactService.BaseService {
  constructor() {
    super("LGPD");
  }

  Buscar = () =>
    this.CreateRequest<boolean>(ReactService.RequestType.GET, `Buscar`);

  Inserir = () =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `Inserir`);

}

export const LGPDService = new LGPD();
