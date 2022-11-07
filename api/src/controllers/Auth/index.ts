import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ControllerItemEntidade, JWTEntidade, LoginEntidade, WebLoginEntidade } from "../../entidades";
import { query } from "./../../helpers";

class AuthController {
  private SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

  login: ControllerItemEntidade = {
    Rota: "/auth/login",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;
      let token = null;

      try {
        const user: LoginEntidade = req.body;
        const select = `SELECT NOM_LOGIN, PWD_LOGIN, IND_ADMIN_ORIGEM, COD_ORIGEM_LOGIN FROM WEB_LOGIN WHERE NOM_LOGIN = '${user.Cnpj}'`;

        result = await query<WebLoginEntidade>(select);
        const userEncontrado = result.recordset[0];

        if (result.rowsAffected[0] === 0) {
          statusCode = 400;
          error = ("Usuário ou senha incorretos.");
          return;
        }

        const isLogged = await bcrypt.compare(user.Senha, userEncontrado.PWD_LOGIN);
        statusCode = isLogged ? 200 : 403;

        if (isLogged) {
          token = jwt.sign(
            JSON.stringify(new JWTEntidade({
              Cnpj: userEncontrado.NOM_LOGIN,
              Admin: (userEncontrado.IND_ADMIN_ORIGEM === "S"),
              Origem: userEncontrado.COD_ORIGEM_LOGIN
            })),
            process.env.TOKEN_KEY
          );
        }
        else {
          error = ("Usuário ou senha incorretos.")
        }
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (token !== null) {
          res.end(JSON.stringify(token))
        }
        else {
          res.end(error)
        }
      }
    }
  }

  criar: ControllerItemEntidade = {
    Rota: "/auth/criar",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: LoginEntidade = req.body;

        const senha = await bcrypt.hash("123", this.SALT_ROUNDS)

        result = await query(`INSERT INTO WEB_LOGIN VALUES ('${user.Cnpj}', 'N', GETDATE(), NULL, ${user.Origem}, '${senha}')`);

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
          return res.end(JSON.stringify("Usuário criado com sucesso. Utilize senha 123"))
        }
        else {
          return res.end(error)
        }
      }
    }
  }

  menu: ControllerItemEntidade = {
    Rota: "/auth/menu",
    Metodo: async (req, res) => {
      let error = null;
      let result = null;
      let statusCode = 200;

      try {
        const user: JWTEntidade = req.user;

        let rotas: string[] = [
          "login",
          "home",
          "produtos",
          "produtosDetalhe",
          "categorias",
          "carrinho"
        ];

        if (user.Admin) {
          const rotasAdmin: string[] = [
            "administracao",
            "efetivador",
            "cadastrar"
          ];

          rotas = rotas.concat(rotasAdmin);
        }
        else {
          const rotasGerais: string[] = [
            "comprovantes",
            "comprovantesDetalhe"
          ];

          rotas = rotas.concat(rotasGerais);
        }

        result = rotas;
      }
      catch (e) {
        error = e.toString();
        statusCode = 500;
      }
      finally {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        if (result !== null) {
          return res.end(JSON.stringify(result))
        }
        else {
          return res.end(error)
        }
      }
    }
  }

  validarJWT = (req: any, res: any, next: any) => {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(403).send("Token inválido.");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Sua sessão expirou. Favor realizar o login novamente.");
    }
    return next();
  };
}

export const Auth = new AuthController();