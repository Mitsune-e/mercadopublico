import * as ReactService from "./ReactService";
import { ParametrosBuscaEfetivador, ParametrosEfetivador, WebProtocoloEntidade } from "@entidades";

class Efetivador extends ReactService.BaseService {
  constructor() {
    super("Efetivador");
  }

  BuscarParametros = () =>
    this.CreateRequest<ParametrosEfetivador>(ReactService.RequestType.GET, ``);

  Buscar = (parametros: ParametrosBuscaEfetivador) =>
    this.CreateRequest<WebProtocoloEntidade[]>(ReactService.RequestType.POST, `buscar`, parametros);

  Efetivar = (parametros: { protocolo: string }) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `efetivar`, parametros);

  Recusar = (parametros: { protocolo: string, motivo: string }) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `recusar`, parametros);

}

export const EfetivadorService = new Efetivador();
