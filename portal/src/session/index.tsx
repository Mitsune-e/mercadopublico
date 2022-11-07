import config from "./../config.json";

export abstract class Session {
  static setToken = async (token: string, setAdmin = true): Promise<void> => {
    if (typeof localStorage !== "undefined")
      localStorage.setItem(`@${config.appName}:token`, token);

    if (setAdmin)
      localStorage.setItem(`@${config.appName}:token-admin`, token);
  };

  static getToken = async (admin = false): Promise<string> => {
    if (typeof localStorage !== "undefined") {
      if (!admin)
        return localStorage.getItem(`@${config.appName}:token`);
      else
        return localStorage.getItem(`@${config.appName}:token-admin`);
    }

    return null;
  };

  static clear = async (): Promise<void> => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(`@${config.appName}:token`);
      localStorage.removeItem(`@${config.appName}:token-admin`);
    }
  };
}