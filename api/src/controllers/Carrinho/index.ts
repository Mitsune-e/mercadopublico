import { DMN_FUNCIONALIDADE } from "../../domains";
import { ControllerItemEntidade, JWTEntidade, WebProdutosEntidade } from "../../entidades";
import { decimalFix, Protocolo, query } from "../../helpers";

class CarrinhoController {
  gravarLance: ControllerItemEntidade = {
    Rota: "/carrinho",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;

        if (user.Admin) {
          statusCode = 403;
          error = "Essa funcionalidade não está disponível para admins.";
          return;
        }

        const produtos: WebProdutosEntidade[] = req.body.Produtos;

        const protocolo = new Protocolo();
        produtos.forEach(x => protocolo.AdicionarItem(x.NOM_PRODUTO, decimalFix(x.VAL_PRODUTO)));
        protocolo.AdicionarItem("Total", decimalFix((produtos.map(x => x.VAL_PRODUTO).reduce((x, y) => x + y))))
        protocolo.MontarConteudo();
        const gravou = await protocolo.Criar(req, DMN_FUNCIONALIDADE.CARRINHO_LANCAR);
        if (gravou) {
          const protocoloGerado = await protocolo.BuscarProtocolo();
          result = protocoloGerado.OID_PROTOCOLO.toString();
        }
        else
          error = "Houve um erro ao gravar seu lance."
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result) {
          res.end(JSON.stringify(result))
        }
        else {
          res.end(error)
        }
      }
    }
  }
}

export const Carrinho = new CarrinhoController();
