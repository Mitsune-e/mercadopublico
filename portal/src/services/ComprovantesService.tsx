import * as ReactService from "./ReactService";
import { WebProtocoloEntidade } from "../entidades";

class Comprovantes extends ReactService.BaseService {
  constructor() {
    super("Comprovantes");
  }

  Buscar = () =>
    this.CreateRequest<WebProtocoloEntidade[]>(ReactService.RequestType.GET, `todos`);

  BuscarPorOid = (oid: number) =>
    this.CreateRequest<WebProtocoloEntidade>(ReactService.RequestType.GET, `oid/?oid=${oid}`);

}

export const ComprovantesService = new Comprovantes();
