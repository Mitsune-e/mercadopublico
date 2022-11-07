import * as ReactService from "./ReactService";
import { WebCategoriaEntidade } from "@entidades";

class Categoria extends ReactService.BaseService {
  constructor() {
    super("Categoria");
  }

  BuscarTodos = () =>
    this.CreateRequest<WebCategoriaEntidade[]>(ReactService.RequestType.GET, `todos`);

  BuscaSub = (oidCategoriaPai: number) =>
    this.CreateRequest<WebCategoriaEntidade[]>(ReactService.RequestType.GET, `sub?oidCategoriaPai=${oidCategoriaPai}`);

  BuscarArvorePelaSub = (oidSubCategoria: number) =>
    this.CreateRequest<WebCategoriaEntidade[]>(ReactService.RequestType.GET, `arvore/sub?oidSubCategoria=${oidSubCategoria}`);

  BuscarPorId = (oidCategoria: number) =>
    this.CreateRequest<WebCategoriaEntidade>(ReactService.RequestType.GET, `id?oidCategoria=${oidCategoria}`);

}

export const CategoriaService = new Categoria();
