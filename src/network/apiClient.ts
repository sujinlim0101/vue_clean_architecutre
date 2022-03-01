import axios from 'axios';
import { APIResponse } from './APIResponse';
import { APIRequest } from './APIRequest';
import { APIError } from './APIError';
import { NetworkClient } from './NetworkClient';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export class APIClient implements NetworkClient{
  static shared: NetworkClient = new APIClient();

  baseURL: string = 'https://api.openweathermap.org/data/2.5';
  timeout: number = 15 * 1000;

  request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    const isRead = request.method === HTTPMethod.GET;

    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isRead && request.params,
          data: !isRead && request.params,
          // withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders()
        })
        .then(data => {
          const response = request.parse
            ? request.parse(data)
            : this.parse<U>(data);
          resolve(response);
        })
        .catch(err => {
          const apiError = this.normalizeError(err);
          reject(apiError);
        });
    });
  }

  private parse<U extends APIResponse>(data: any): U {
    return data;
  }

  private normalizeError(error: any): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    };
  }

  private createHeaders(): any {
    return {};
  }
}
