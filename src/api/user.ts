import { HTTPTransport } from 'utils';
import { APIError } from './types';

type EditRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

type PasswordRequestData = {
  oldpassword: string,
  newpassword: string,
};

type ResponseData = Promise<unknown> | APIError;

export default class UserAPI {
  private _request: HTTPTransport = new HTTPTransport();

  public editData = (data: EditRequestData): ResponseData =>
    this._request.put('user/profile', {data: data});

  public editPassword = (data: PasswordRequestData): ResponseData =>
    this._request.put('user/password', {data: data});

  public uploadAvatar = (data: FormData): ResponseData =>
    this._request.put('user/profile/avatar', {data: data, headers: {}});
  
}
