import AuthAPI from 'api/auth';
import ChatAPI from 'api/chat';
import { UserDTO, ChatDTO} from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, transformChat, apiHasError } from 'utils';

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
      console.log(responseChats)
      if (apiHasError(responseChats)) {
        return;
      }

      const chats = [...responseChats as ChatDTO[]];

      chats.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          console.log(day)
          chat.last_message.time = day;
        }
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