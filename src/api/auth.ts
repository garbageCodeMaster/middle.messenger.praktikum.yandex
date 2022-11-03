import { HTTPTransport } from 'utils/HTTPTransport';
import { APIError, UserDTO } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

type RegisterRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

type ResponseData = {} | APIError;

export default class AuthAPI {
  private _request: HTTPTransport = new HTTPTransport();

  public login = (data: LoginRequestData): ResponseData =>
    this._request.post('auth/signin', {data: data});

  public register = (data: RegisterRequestData): ResponseData =>
    this._request.post('auth/signup', {data: data});

  public me = () =>
    this._request.get('auth/user');
  
  public logout = () => 
    this._request.post('auth/logout');
};
