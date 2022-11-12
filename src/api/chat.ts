import { HTTPTransport } from 'utils/HTTPTransport';
import { APIError } from './types';


type ResponseData = {} | APIError;

export default class ChatAPI {
  private _request: HTTPTransport = new HTTPTransport();

  public getChat = (id: number): ResponseData =>
    this._request.get(`chats/${id}/common`);

  public getChats = (offset = 0, limit = 20, title = '') =>
    this._request.get('chats', {data: {offset, limit, title}});

  public addChat = (title: string) =>
    this._request.post('chats', { data: {title: title}});
  
  public searchUser = (login: string) =>
    this._request.post('user/search', { data: {login: login} });

  public addUsers = (usersId: number[], chatId: number) => 
    this._request.put('chats/users', {data: { users: usersId, chatId: chatId }});

  public deleteChat = (chatId: number) => 
    this._request.delete('chats', {data: { chatId: chatId }});

  public deleteUsers = (usersId: number[], chatId: number) => 
    this._request.delete('chats/users', {data: { users: usersId, chatId: chatId }});

  public getToken = (id: number) =>
    this._request.post(`chats/token/${id}`, {});
    
};
