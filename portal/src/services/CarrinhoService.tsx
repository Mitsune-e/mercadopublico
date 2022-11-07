import * as ReactService from "./ReactService";
import { WebProdutosEntidade } from "@entidades";

interface IGravarLance {
  Produtos: WebProdutosEntidade[]
}

class Carrinho extends ReactService.BaseService {
  constructor() {
    super("Carrinho");
  }

  GravarLance = (produtos: IGravarLance) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, ``, produtos);

}

export const CarrinhoService = new Carrinho();
