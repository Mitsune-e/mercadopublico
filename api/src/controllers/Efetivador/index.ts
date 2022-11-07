import { DMN_SITUACAO, SITUACOES } from "../../domains";
import { ControllerItemEntidade, JWTEntidade, LoginEntidade, WebFuncionalidade, WebProtocoloEntidade } from "../../entidades";
import { Protocolo, query } from "../../helpers";
import { ParametrosBuscaEfetivador, ParametrosEfetivador } from "./ParametrosEfetivador";

class EfetivadorController {
  buscarParametros: ControllerItemEntidade = {
    Rota: "/efetivador",
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

        const parametros = new ParametrosEfetivador();

        const funcionalides = await query<WebFuncionalidade>(`SELECT * FROM WEB_FUNCIONALIDADE`);
        parametros.Funcionalidades = funcionalides.recordset;
        parametros.Situacoes = SITUACOES;

        result = parametros;
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

  buscar: ControllerItemEntidade = {
    Rota: "/efetivador/buscar",
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

        const parametros: ParametrosBuscaEfetivador = req.body;
        const situacao = parametros.Situacao ? `'${parametros.Situacao}'` : null;

        const select = `SELECT P.TXT_USUARIO_SOLICITACAO, F.DES_FUNCIONALIDADE, P.DTA_SOLICITACAO, P.COD_IDENTIFICADOR, P.DES_SITUACAO, P.DTA_EFETIVACAO, P.OID_PROTOCOLO, P.TXT_USUARIO_EFETIVACAO, P.TXT_MOTIVO_RECUSA, P.TXT_IPV4, P.TXT_IPV6, P.TXT_DISPOSITIVO, P.TXT_ORIGEM FROM WEB_PROTOCOLO P INNER JOIN WEB_FUNCIONALIDADE F ON P.OID_FUNCIONALIDADE = F.OID_FUNCIONALIDADE WHERE (P.OID_FUNCIONALIDADE = ${parametros.Funcionalidade} OR ${parametros.Funcionalidade} = 0) AND (P.DES_SITUACAO = ${situacao} OR ${situacao} IS NULL)`;

        const protocolos = (await query<WebProtocoloEntidade>(select)).recordset;

        for (let i = 0; i < protocolos.length; i++) {
          const protocoloSelecionado = protocolos[i];
          const protocolo = new Protocolo();
          await protocolo.BuscarProtocoloPorOid(protocoloSelecionado.OID_PROTOCOLO);
          await protocolo.DesmontarConteudo();

          protocoloSelecionado.ListaTransacao = protocolo.BuscarListaConteudo();
        }
        result = protocolos;
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

  efetivar: ControllerItemEntidade = {
    Rota: "/efetivador/efetivar",
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

        const protocolo = req.body.protocolo;

        const update = `UPDATE WEB_PROTOCOLO SET DTA_EFETIVACAO = GETDATE(), TXT_USUARIO_EFETIVACAO = '${user.Cnpj}', DES_SITUACAO = '${DMN_SITUACAO.EFETIVADO}' WHERE COD_IDENTIFICADOR = '${protocolo}'`;

        result = await query(update);

        if (result.rowsAffected[0] === 0) {
          statusCode = 400;
          error = "Houve um erro ao criar o usuário. Favor tente novamente mais tarde.";
        }
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify("Protocolo efetivado com sucesso."))
        }
        else {
          res.end(error)
        }
      }
    }
  }

  recusar: ControllerItemEntidade = {
    Rota: "/efetivador/recusar",
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

        const protocolo = req.body.protocolo;
        const motivo = req.body.motivo;

        const update = `UPDATE WEB_PROTOCOLO SET DTA_EFETIVACAO = GETDATE(), TXT_USUARIO_EFETIVACAO = '${user.Cnpj}', DES_SITUACAO = '${DMN_SITUACAO.RECUSADO}', TXT_MOTIVO_RECUSA = '${motivo}' WHERE COD_IDENTIFICADOR = '${protocolo}'`;

        result = await query(update);

        if (result.rowsAffected[0] === 0) {
          statusCode = 400;
          error = "Houve um erro ao criar o usuário. Favor tente novamente mais tarde.";
        }
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          res.end(JSON.stringify("Protocolo recusado com sucesso."))
        }
        else {
          res.end(error)
        }
      }
    }
  }
}

export const Efetivador = new EfetivadorController();