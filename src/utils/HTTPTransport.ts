import { API_URL } from 'api/types';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type RequestData = Record<string, string | number>;

type RequestOptions = {
  method?: METHODS;
  headers?: Record<string, string>;
  timeout?: number;
  data?: unknown;
  query?: string;
};

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>;

function queryStringify(data: RequestData) {
  if (!data) {
    return '';
  }
  return '?' + Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

export class HTTPTransport {
  private _apiURL = API_URL;

  public get: HTTPMethod = (url, options) =>
    this.request(url, { 
      ...options, 
      query: options?.data ? queryStringify(options.data as RequestData) : '',
      method: METHODS.GET, 
    });

  public post: HTTPMethod  = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST });

  public put: HTTPMethod  = (url, options ) =>
    this.request(url, { ...options, method: METHODS.PUT });

  public patch: HTTPMethod  = (url, options) => 
    this.request(url, { ...options, method: METHODS.PATCH });

  public delete: HTTPMethod  = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  private request: HTTPMethod  = (url, options) => {
    const { method = METHODS.GET, headers = { "Content-Type": "application/json" }, data, query = '', timeout = 5000 } = options as RequestOptions;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open(method, `${this._apiURL}${url}${query}`);

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));

      xhr.onload = () => {
        try {
          resolve(JSON.parse(xhr.response));
        }
        catch {
          resolve(xhr.response);
        }
      }

      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      method === METHODS.GET || !data ? xhr.send() : xhr.send(JSON.stringify(data));
    });
  };
}
