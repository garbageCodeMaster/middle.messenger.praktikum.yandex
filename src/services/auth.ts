import AuthAPI from 'api/auth';
import ChatAPI from 'api/chat';
import { UserDTO, ChatDTO, API_URL } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, transformChat, apiHasError, formatDate } from 'utils';
import defaultAvatar from '/static/defaultAvatar/man.png';

type LoginPayload = {
  login: string;
  password: string;
};

type RegisterPayload = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

export class AuthService {
  private api: AuthAPI;
  private apiChat: ChatAPI;

  constructor() {
    this.api = new AuthAPI();
    this.apiChat = new ChatAPI();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: LoginPayload,
  ): Promise<void> {
    try {
      const response = await this.api.login(data);

      if (apiHasError(response)) {
        window.store.setApiMessage({ apiMessage: {
          message: `${response.reason}`,
          type: 'error' 
        }});
        return;
      }

      const responseUser = await this.api.me();
    
      if (apiHasError(responseUser)) {
        dispatch(this.logout);
        return;
      }
    
      dispatch({ user: transformUser(responseUser as UserDTO) });
      
      const responseChats = await this.apiChat.getChats();

      if (apiHasError(responseChats)) {
        return;
      }

      const chats = [...responseChats as ChatDTO[]];

      chats.map((chat) => {
        if (chat.last_message) {
          chat.last_message.time = formatDate(chat.last_message.time);
        }
        
        const avatar = chat.avatar !== null ? API_URL+'resources'+chat.avatar : defaultAvatar;
        chat.avatar = avatar;
      });
      
      dispatch({ 
        chats: transformChat(chats as ChatDTO[]),
      });

      window.router.go('/messenger');
    } 
    catch (error) {
      console.error(error);
    }
  }

  async register(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: RegisterPayload,
  ): Promise<void> {
    try {
      const response = await this.api.register(data);

      if (apiHasError(response)) {
        window.store.setApiMessage({ apiMessage: {
          message: `${response.reason}`,
          type: 'error' 
        }});
        return;
      }

      const responseUser = await this.api.me();
      
      if (apiHasError(responseUser)) {
        dispatch(this.logout);
        return;
      }
    
      dispatch({ user: transformUser(responseUser as UserDTO) });
      window.router.go('/messenger');
    } 
    catch (error) {
      console.error(error);
    }
  }

  async me(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: LoginPayload,
  ): Promise<void> {
    try {
      const response = await this.api.me();

      dispatch({ user: null });
      
      if (apiHasError(response)) {
        return;
      } 
      
      dispatch({ user: transformUser(response as UserDTO) });
      window.router.go('/messenger');
    } 
    catch (error) {
      console.error(error);
    }
  }

  async logout(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: LoginPayload,
  ): Promise<void> {
    try {
      const response = await this.api.logout();

      if (apiHasError(response)) {
        return;
      } 

      dispatch({ user: null, chats: []});
      window.router.go('/login');
    } 
    catch (error) {
      console.error(error);
    }
  }
}

export default new AuthService();
