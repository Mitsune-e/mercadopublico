import axios, { AxiosRequestConfig } from "axios";

import config from "./../../config.json";

export enum RequestType {
  GET = "GET",  // eslint-disable-line no-unused-vars
  POST = "POST", // eslint-disable-line no-unused-vars
  PUT = "PUT", // eslint-disable-line no-unused-vars
  PATCH = "PATCH", // eslint-disable-line no-unused-vars
  DELETE = "DELETE" // eslint-disable-line no-unused-vars
}

export enum ResponseType {
  Normal, // eslint-disable-line no-unused-vars
  Blob, // eslint-disable-line no-unused-vars
  Zip // eslint-disable-line no-unused-vars
}

export class BaseService {
  // Name of the controller used in this service
  private controller: string;

  constructor(controller: string) {
    this.controller = controller;
  }

  // Get the session token
  public GetToken(key = "token"): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof localStorage !== "undefined") resolve(localStorage.getItem(key));
        return resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create a request using an URL
  public async CreateRequestByUrl<T>(
    requestType: RequestType,
    url: string,
    data?: any,// eslint-disable-line
    responseType: ResponseType = ResponseType.Normal
  ): Promise<T> {
    const token = await this.GetToken(`@${config.appName}:token`);

    const options: AxiosRequestConfig = {
      method: requestType,
      url: config.apiUrl + url,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (responseType === ResponseType.Blob) options.responseType = "blob";
    else if (responseType === ResponseType.Zip) options.responseType = "arraybuffer";

    const { data: result } = await axios(options);

    return result as T;
  }

  public async CreateRequest<T>(
    requestType: RequestType,
    route?: string | null,
    data?: any | null,
    responseType: ResponseType = ResponseType.Normal
  ): Promise<T> {
    return new Promise((resolve: any, reject: any) => {
      let url = `/${this.controller}`;

      if (route && route !== "") url = `${url}/${route}`;

      this.CreateRequestByUrl<T>(requestType, url, data, responseType).then(resolve, (error) => {
        const e: any = error;
        reject(e.response ? e.response.data : e);
      });
    });
  }
}
