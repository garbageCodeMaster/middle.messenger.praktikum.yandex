import { HTTPTransport } from 'utils/HTTPTransport';
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

type ResponseData = {} | APIError;

export default class UserAPI {
  private _request: HTTPTransport = new HTTPTransport();

  // public searchUser(login: string) {
  //   return this._http.post<IProfile[] | ResponseError>(`/user/search`, {
  //     data: {login: login}
  //   });
  // }

  public editData = (data: EditRequestData): ResponseData =>
    this._request.put('/user/profile', {data: data});

  public editPassword = (data: PasswordRequestData): ResponseData =>
    this._request.put('/user/password', {data: data});

  public uploadAvatar = (data: unknown) =>
    this._request.put('/user/profile/avatar', {data: data});
  
};
