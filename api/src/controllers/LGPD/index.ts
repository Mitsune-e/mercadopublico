import { ControllerItemEntidade, IdentificacaoEntidade, JWTEntidade, LGPDConsentimentoEntidade, WebOrigem } from "../../entidades";
import { montarCodigo, query } from "../../helpers";

class LGPDController {
  buscar: ControllerItemEntidade = {
    Rota: "/lgpd/buscar",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;

        const aceites = await query<LGPDConsentimentoEntidade>(`SELECT * FROM WEB_LGPD_CONSENTIMENTO WHERE COD_CNPJ = '${user.Cnpj}'`);

        if (aceites.rowsAffected[0] > 0) {
          result = true;
        }
        else {
          error = false;
        }
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

  inserir: ControllerItemEntidade = {
    Rota: "/lgpd/inserir",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;
        const identificador = new IdentificacaoEntidade(req);

        const protocolo = montarCodigo(user.Cnpj);

        const buscaDominio = await query<WebOrigem>(`SELECT COD_ORIGEM, DS_ORIGEM FROM WEB_ORIGEM WHERE COD_ORIGEM = ${user.Origem}`);
        const origem = buscaDominio.recordset[0];

        result = await query(`INSERT INTO WEB_LGPD_CONSENTIMENTO VALUES (
            '${protocolo}',
            '${user.Cnpj}',
            GETDATE(),
            '${identificador.ip}',
            '${identificador.ip}',
            '${identificador.userAgent}',
            '${origem.DS_ORIGEM}'
        )`);

        if (result.rowsAffected[0] === 0) {
          statusCode = 400;
          error = "Houve um erro ao registrar o seu aceite dos termos da LGPD.";
        }
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          return res.end(JSON.stringify("Aceite cadastrado com sucesso."))
        }
        else {
          return res.end(error)
        }
      }
    }
  }
}

export const LGPD = new LGPDController();