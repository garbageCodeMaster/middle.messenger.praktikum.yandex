import AuthAPI from 'api/auth';
import ChatAPI from 'api/chat';
import { UserDTO, ChatDTO, API_URL} from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, transformChat, apiHasError, formatDate } from 'utils';
import defaultAvatar from '/static/defaultAvatar/man.png'

export class InitService {

  private api: AuthAPI;
  private apiChat: ChatAPI;

  constructor() {
    this.api = new AuthAPI();
    this.apiChat = new ChatAPI();

    this.initApp = this.initApp.bind(this);
  }

  async initApp(
    dispatch: Dispatch<AppState>,
  ): Promise<void> {
    try { 
      const response = await this.api.me();
      
      if (apiHasError(response)) {
        return;
      }
      
      const responseChats = await this.apiChat.getChats();
  
      if (apiHasError(responseChats)) {
        return;
      }

      const chats = [...responseChats as ChatDTO[]];

      chats.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = formatDate(day);
        }
        const avatar = chat.avatar !== null ? API_URL+'resources'+chat.avatar : defaultAvatar;
        chat.avatar = avatar;
      });
      
      dispatch({ 
        user: transformUser(response as UserDTO),
        chats: transformChat(chats as ChatDTO[]),
      });

    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ appIsInited: true });
    }
  }
}

export default new InitService();