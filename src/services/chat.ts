import ChatAPI from 'api/chat';
import Socket from 'api/websoket';
import { API_URL, ChatDTO, UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformChat, apiHasError, formatDate } from 'utils';
import defaultAvatar from '/static/defaultAvatar/man.png'

export class ChatService {
  private api: ChatAPI;
  private socket: Socket | null;
  private curentChat: number | null;

  constructor() {
    this.api = new ChatAPI();
    this.socket = null;
    this.curentChat = null;

    this.getChats = this.getChats.bind(this); 
    this.getChat = this.getChat.bind(this); 
    this.addChat = this.addChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  public async searchUser(
    login: string,
  ) {
    try {
      const response = await this.api.searchUser(login);

      if (apiHasError(response)) {
        return;
      }

      return response as UserDTO[];
    } 
    catch (error) {
      console.error(error);
    }
  }

  async getChat(
    id: number,
  ): Promise<void> {
    try {
      const response = await this.api.getChats();

      if (apiHasError(response)) {
        return;
      }

      const chat = [...response as ChatDTO[]];

      chat.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = formatDate(day);
        }
        const avatar = chat.avatar !== null ? API_URL+'resources'+chat.avatar : defaultAvatar;
        chat.avatar = avatar;
      });

      
      window.store.setChat(transformChat(chat as ChatDTO[]));
    } 
    catch (error) {
      console.error(error);
    }
  }

  async getChats(
    dispatch: Dispatch<AppState>,
  ): Promise<void> {
    try {
      const response = await this.api.getChats();

      if (apiHasError(response)) {
        return;
      }
      
      const chats = [...response as ChatDTO[]];

      chats.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = formatDate(day);
        }
        const avatar = chat.avatar !== null ? API_URL+'resources'+chat.avatar : defaultAvatar;
        chat.avatar = avatar;
      });

      dispatch({ chats: transformChat(chats as ChatDTO[]) });
    } 
    catch (error) {
      console.error(error);
    }
  }

  public async addChat(
    dispatch: Dispatch<AppState>,
    state: AppState,
    title: string,
  ): Promise<void> {
    try {
      const usersId = await this.api.searchUser(title) as UserDTO[];

      if (apiHasError(usersId)) {
        console.error(usersId.reason);
        return;
      } 

      if (usersId.length === 0) {
        console.error(`No user with login: ${title}`);
        window.store.setApiMessage({ apiMessage: {
          message: `No user with login: ${title}`,
          type: 'error' 
        }});
        
        window.store.setChat([]);

        return;
      }

      const chatId = await this.api.addChat(title) as {id: number};

      if (apiHasError(chatId)) {
        console.error(chatId.reason);
        return;
      } 

      const result = await this.api.addUsers([usersId[0].id] as number[], chatId.id as number);

      if (apiHasError(result)) {
        console.error(result.reason);
        return;
      } 

      const response = await this.api.getChats();

      if (apiHasError(response)) {
        console.error(response.reason);
        return;
      }

      const chats = [...response as ChatDTO[]];
        if (chats[0].last_message) {
          const day = new Date(chats[0].last_message.time);
          chats[0].last_message.time = formatDate(day);
        }
        const avatar = chats[0].avatar !== null ? API_URL+'resources'+chats[0].avatar : defaultAvatar;
        chats[0].avatar = avatar;

      window.store.setChat(transformChat([chats[0]] as ChatDTO[]));
      
    } 
    catch (error) {
      console.error(error);
    }
  }

  public async addUsers(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: {    
      logins: string[], 
      chatId: number,
    }
  ): Promise<void> {
    try {
        const users = [];
      
        for (const login of data.logins) {
          const user = await this.searchUser(login); 

          if (!user || user.length === 0) {
            console.error(`No user with login: ${login}`);
            window.store.setApiMessage({ apiMessage: {
              message: `No user with login: ${login}`,
              type: 'error' 
            }});

            continue;
          }

          users.push(user[0].id);
        }

      const response = await this.api.addUsers(users, data.chatId);

      if (apiHasError(response)) {
        console.error(response.reason);
        return;
      } 
      
    } 
    catch (error) {
      console.error(error);
    }
  }

  public async connectSocket(
    dispatch: Dispatch<AppState>,
    state: AppState,
    ids: {chatId: number, userId: number}
    ): Promise<void> {
    try {
      const { token } = await this.api.getToken(ids.chatId) as {token: string};

      this.socket = new Socket(ids.userId, ids.chatId, token);
      this.curentChat = ids.chatId;

    } catch (error) {
      console.error(error);
    }
  }

  public async sendMessage(
    dispatch: Dispatch<AppState>,
    state: AppState,
    message: string
    ): Promise<void> {
    try {
      if (this.socket) {
        this.socket.sendMessage(message);

        if (this.curentChat) {
          await this.getChat(this.curentChat);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteUser(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: {    
      login: string, 
      chatId: number,
    }
  ): Promise<void> {
    try {
      const user = await this.searchUser(data.login);

      if (apiHasError(user)) {
        console.error(user.reason);
        return;
      }
  
      if (!user) return;
      if (user.length === 0) {
        console.error(`No user with login: ${data.login}`);
        window.store.setApiMessage({ apiMessage: {
          message: `No user with login: ${data.login}`,
          type: 'error' 
        }});

        return;
      }
  
      const result = await this.api.deleteUsers([user[0].id], data.chatId);
      if (apiHasError(result)) {
        console.error(result.reason);
        return;
      } 

      window.store.setApiMessage({ apiMessage: {
        message: `User "${data.login}" was removed from chat`,
        type: 'success' 
      }});
      this.getChat(data.chatId);

    } catch (error) {
      console.error(error)
    }
  }

  public async deleteChat(
  dispatch: Dispatch<AppState>,
  ): Promise<void>  {
    try {
      const chatId = window.store.getState().chats.find((chat: Chat) => chat.selected === true)?.id;
      const result = await this.api.deleteChat(chatId as number);

      if (apiHasError(result)) {
        console.error(result.reason);
        return;
      } 

      await this.getChats(dispatch);
      window.store.setChat([]);

    } 
    catch (error) {
      console.error(error);
    }
  }
}

export default new ChatService();
