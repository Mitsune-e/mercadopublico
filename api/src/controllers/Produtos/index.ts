import * as sql from "mssql";
import { ControllerItemEntidade, JWTEntidade, WebProdutosEntidade } from "../../entidades";
import { getConnection, query } from "./../../helpers";

class ProdutosController {
  buscarTodos: ControllerItemEntidade = {
    Rota: "/produtos/todos",
    Metodo: async (_, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const connection: sql.ConnectionPool = await getConnection();

        const query: string = `SELECT PK_PRODUTO, NOM_PRODUTO, DS_PRODUTO, C.DS_CATEGORIA, C.COD_CATEGORIA , SC.DS_CATEGORIA AS 'DS_SUB_CATEGORIA', SC.COD_CATEGORIA AS 'COD_SUB_CATEGORIA', VAL_PRODUTO, IMG_REF_PRODUTOS, NUM_PRAZO_PRODUTO FROM WEB_PRODUTOS P
        INNER JOIN WEB_CATEGORIA C
        ON C.COD_CATEGORIA = P.COD_CATEGORIA
        LEFT OUTER JOIN WEB_CATEGORIA SC
        ON SC.COD_CATEGORIA = P.COD_SUB_CATEGORIA 
        ORDER BY C.COD_CATEGORIA` ;

        result = await connection.request().query<WebProdutosEntidade>(query);
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify(result.recordset))
        }
        else {
          res.end(error)
        }
      }
    }
  }

  buscarPorCategoria: ControllerItemEntidade = {
    Rota: "/produtos/categoria",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const idcategoria = req.query.idcategoria

        const connection: sql.ConnectionPool = await getConnection();

        const query: string = `SELECT PK_PRODUTO, NOM_PRODUTO, DS_PRODUTO, C.DS_CATEGORIA, C.COD_CATEGORIA , SC.DS_CATEGORIA AS 'DS_SUB_CATEGORIA', SC.COD_CATEGORIA AS 'COD_SUB_CATEGORIA', VAL_PRODUTO, IMG_REF_PRODUTOS, NUM_PRAZO_PRODUTO FROM WEB_PRODUTOS P
        INNER JOIN WEB_CATEGORIA C
        ON C.COD_CATEGORIA = P.COD_CATEGORIA
        LEFT OUTER JOIN WEB_CATEGORIA SC
        ON SC.COD_CATEGORIA = P.COD_SUB_CATEGORIA 
        WHERE C.COD_CATEGORIA = ${idcategoria} OR SC.COD_CATEGORIA = ${idcategoria} OR SC.COD_CATEGORIA_PAI = ${idcategoria}
        ORDER BY C.COD_CATEGORIA 
        `

        result = await connection.request().query<WebProdutosEntidade>(query);

        // cosnt quer
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify(result.recordset))
        }
        else {
          res.end(error)
        }
      }

    }
  }

  buscarNovos: ControllerItemEntidade = {
    Rota: "/produtos/novos",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const connection: sql.ConnectionPool = await getConnection();

        const query: string = `SELECT TOP 3
        P.PK_PRODUTO,
        P.NOM_PRODUTO,
        P.DTA_CADASTRO,
        P.VAL_PRODUTO, 
        P.IMG_REF_PRODUTOS,
        P.DS_PRODUTO, 
        P.COD_CATEGORIA, 
        P.COD_SUB_CATEGORIA,
        C.DS_CATEGORIA,
        SC.DS_CATEGORIA AS 'DS_SUB_CATEGORIA',
        P.NUM_PRAZO_PRODUTO
        FROM WEB_PRODUTOS P
        INNER JOIN WEB_CATEGORIA C
        ON C.COD_CATEGORIA = P.COD_CATEGORIA
        LEFT OUTER JOIN WEB_CATEGORIA SC
        ON SC.COD_CATEGORIA = P.COD_SUB_CATEGORIA ORDER BY DTA_CADASTRO`

        result = await connection.request().query<WebProdutosEntidade>(query);
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify(result.recordset))
        }
        else {
          res.end(error)
        }
      }
    }
  }

  buscarPorId: ControllerItemEntidade = {
    Rota: "/produtos/id",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const oidproduto = req.query.oidProduto;

        const queryString: string = `SELECT PK_PRODUTO, NOM_PRODUTO, DS_PRODUTO, C.DS_CATEGORIA, C.COD_CATEGORIA , SC.DS_CATEGORIA AS 'DS_SUB_CATEGORIA', SC.COD_CATEGORIA AS 'COD_SUB_CATEGORIA', VAL_PRODUTO, IMG_REF_PRODUTOS, NUM_PRAZO_PRODUTO, DTA_CADASTRO FROM WEB_PRODUTOS P
        INNER JOIN WEB_CATEGORIA C
        ON C.COD_CATEGORIA = P.COD_CATEGORIA
        LEFT OUTER JOIN WEB_CATEGORIA SC
        ON SC.COD_CATEGORIA = P.COD_SUB_CATEGORIA
        WHERE PK_PRODUTO = ${oidproduto}
        ORDER BY C.COD_CATEGORIA` ;

        const categorias = await query<WebProdutosEntidade>(queryString);
        result = categorias.recordset[0];
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify(result))
        }
        else {
          res.end(error)
        }
      }
    }
  }

  cadastrar: ControllerItemEntidade = {
    Rota: "/produtos/cadastrar",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;

        if (!user.Admin) {
          statusCode = 403;
          error = "Área Restrita.";
          return;
        }

        const produto: WebProdutosEntidade = req.body;
        produto.DS_PRODUTO = produto.DS_PRODUTO ? `'${produto.DS_PRODUTO}'` : null;
        produto.IMG_REF_PRODUTOS = produto.IMG_REF_PRODUTOS ? `'${produto.IMG_REF_PRODUTOS}'` : null;

        const insert: string = `INSERT INTO WEB_PRODUTOS VALUES (${produto.COD_CATEGORIA}, ${produto.COD_SUB_CATEGORIA}, '${produto.NOM_PRODUTO}', ${produto.VAL_PRODUTO.toString().replace(",", ".")}, ${produto.DS_PRODUTO}, GETDATE(), ${produto.IMG_REF_PRODUTOS}, ${produto.NUM_PRAZO_PRODUTO})`;

        result = await query<WebProdutosEntidade>(insert);

        if (result.rowsAffected[0] === 0) {
          statusCode = 400;
          error = "Houve um erro ao cadastrar o produto. Favor tente novamente mais tarde.";
        }
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify("Produto cadastrado com sucesso."))
        }
        else {
          res.end(error)
        }
      }
    }
  }
}


export const Produtos = new ProdutosController();
