import { WebCategoriaEntidade, ControllerItemEntidade } from "../../entidades";
import { query } from "../../helpers";

class CategoriaController {
  buscarTodas: ControllerItemEntidade = {
    Rota: "/categoria/todos",
    Metodo: async (_, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const categorias = await query<WebCategoriaEntidade>(`SELECT * FROM WEB_CATEGORIA WHERE COD_CATEGORIA_PAI IS NULL`);
        result = categorias.recordset;
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

  buscarSub: ControllerItemEntidade = {
    Rota: "/categoria/sub",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const oidCategoriaPai = req.query.oidCategoriaPai;

        const queryString = `
        (SELECT * FROM WEB_CATEGORIA NIVEL1 WHERE NIVEL1.COD_CATEGORIA_PAI = ${oidCategoriaPai})
        UNION ALL
        (SELECT NIVEL2.* FROM WEB_CATEGORIA NIVEL1 INNER JOIN WEB_CATEGORIA NIVEL2 ON NIVEL1.COD_CATEGORIA = NIVEL2.COD_CATEGORIA_PAI WHERE NIVEL1.COD_CATEGORIA_PAI = ${oidCategoriaPai})`;

        const categorias = await query<WebCategoriaEntidade>(queryString);
        result = categorias.recordset;
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

  buscarArvorePelaSub: ControllerItemEntidade = {
    Rota: "/categoria/arvore/sub",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const oidSubCategoria = req.query.oidSubCategoria;

        const queryString = `WITH x AS (
          SELECT p.*
          FROM WEB_CATEGORIA p
          WHERE COD_CATEGORIA = ${oidSubCategoria}
        ),
        parents as (
          SELECT * 
          FROM x 
          UNION ALL
          SELECT p.* 
          FROM parents JOIN
              WEB_CATEGORIA p
              ON p.COD_CATEGORIA= parents.COD_CATEGORIA_PAI
        ),
        children as (
          SELECT * 
          FROM x 
          UNION ALL
          SELECT p.* 
          FROM children JOIN
              WEB_CATEGORIA p
              ON p.COD_CATEGORIA= children.COD_CATEGORIA_PAI
        )
        SELECT distinct * 
        FROM parents
        UNION
        SELECT distinct *
        FROM children;`;

        const categorias = await query<WebCategoriaEntidade>(queryString);
        result = categorias.recordset;
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

  buscarPorId: ControllerItemEntidade = {
    Rota: "/categoria/id",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const oidCategoria = req.query.oidCategoria;

        const queryString = `SELECT * FROM WEB_CATEGORIA WHERE PK_CATEGORIA = ${oidCategoria}`;

        const categorias = await query<WebCategoriaEntidade>(queryString);
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
}

export const Categoria = new CategoriaController();