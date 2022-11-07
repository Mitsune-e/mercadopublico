import { ControllerItemEntidade, JWTEntidade, WebProtocoloEntidade } from "../../entidades";
import { Protocolo, query } from "../../helpers";

class ComprovantesController {
  buscarTodos: ControllerItemEntidade = {
    Rota: "/comprovantes/todos",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;

        const comprovantes = await query<WebProtocoloEntidade>(`SELECT F.DES_FUNCIONALIDADE, P.DTA_SOLICITACAO, P.COD_IDENTIFICADOR, P.DES_SITUACAO, P.DTA_EFETIVACAO, P.OID_PROTOCOLO FROM WEB_PROTOCOLO P INNER JOIN WEB_FUNCIONALIDADE F ON P.OID_FUNCIONALIDADE = F.OID_FUNCIONALIDADE WHERE P.TXT_USUARIO_SOLICITACAO = '${user.Cnpj}'`);
        result = comprovantes.recordset
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

  buscarPorOid: ControllerItemEntidade = {
    Rota: "/comprovantes/oid",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;
        const oid = req.query.oid;

        const protocoloEncontrado = await query<WebProtocoloEntidade>(`SELECT P.TXT_USUARIO_SOLICITACAO, F.DES_FUNCIONALIDADE, P.DTA_SOLICITACAO, P.COD_IDENTIFICADOR, P.DES_SITUACAO, P.DTA_EFETIVACAO, P.OID_PROTOCOLO, P.TXT_USUARIO_EFETIVACAO, P.TXT_MOTIVO_RECUSA, P.TXT_IPV4, P.TXT_IPV6, P.TXT_DISPOSITIVO, P.TXT_ORIGEM FROM WEB_PROTOCOLO P INNER JOIN WEB_FUNCIONALIDADE F ON P.OID_FUNCIONALIDADE = F.OID_FUNCIONALIDADE WHERE P.TXT_USUARIO_SOLICITACAO = '${user.Cnpj}' AND P.OID_PROTOCOLO = ${oid}`);

        if (protocoloEncontrado.rowsAffected[0] === 0) {
          error = "Nenuhm protocolo encontrado.";
          statusCode = 400;
          return;
        }

        result = protocoloEncontrado.recordset[0];

        const protocolo = new Protocolo();

        await protocolo.BuscarProtocoloPorOid(oid);
        await protocolo.DesmontarConteudo();

        result.ListaTransacao = protocolo.BuscarListaConteudo();
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

export const Comprovantes = new ComprovantesController();