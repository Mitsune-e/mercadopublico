import * as ReactService from "./ReactService";
import { LoginEntidade } from "@entidades";

class Auth extends ReactService.BaseService {
  constructor() {
    super("Auth");
  }

  Criar = (user: LoginEntidade) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `Criar`, user);

  Login = (user: LoginEntidade) =>
    this.CreateRequest<string>(ReactService.RequestType.POST, `Login`, user);

}

export const AuthService = new Auth();
