import * as ReactService from "./ReactService";
import { WebProdutosEntidade } from "@entidades";

class Produtos extends ReactService.BaseService {
  constructor() {
    super("Produtos");
  }

  BuscarTodos = () =>
    this.CreateRequest<WebProdutosEntidade[]>(ReactService.RequestType.GET, `todos`);

  BuscaPorCategoria = (idcategoria: number) =>
    this.CreateRequest<WebProdutosEntidade[]>(ReactService.RequestType.GET, `categoria/?idcategoria=${idcategoria}`);

  BuscarNovos = () =>
    this.CreateRequest<WebProdutosEntidade[]>(ReactService.RequestType.GET, 'novos')

  BuscarPorId = (id: number) =>
    this.CreateRequest<WebProdutosEntidade>(ReactService.RequestType.GET, `id/?oidProduto=${id}`)

  Cadastrar = (produto: WebProdutosEntidade) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `cadastrar`, produto)
}

export const ProdutosService = new Produtos();
