import { ControllerItemEntidade } from "../../entidades";
import Package from "./../../../package.json"

class VersionController {
  check: ControllerItemEntidade = {
    Rota: "/",
    Metodo: async (req, res) => {
      res.end(Package.version);
    }
  }
}


export const Version = new VersionController();