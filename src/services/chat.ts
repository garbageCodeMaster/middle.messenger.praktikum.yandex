import ChatAPI from 'api/chat';
import Socket from 'api/websoket';
import { ChatDTO, UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformChat, apiHasError, formatDate } from 'utils';

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
      console.log(response, id)
      const chat = [...response as ChatDTO[]];
      //chat find  по id  ????
      chat.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = formatDate(day);
        }
      });

      console.log("CHATS::::", chat)

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
      });

      console.log("CHATS::::", chats)

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

    window.store.setChat(transformChat([chats[0]] as ChatDTO[]));
    
  } catch (error) {
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
            continue;
          }

          users.push(user[0].id);
        }

      const response = await this.api.addUsers(users, data.chatId);

      if (apiHasError(response)) {
        console.error(response.reason);
        return;
      } 
      
      //this.getChat();
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
      console.log("connect socket")
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
        return;
      }
  
      const result = await this.api.deleteUsers([user[0].id], data.chatId);
      if (apiHasError(result)) {
        console.error(result.reason);
        return;
      } 

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
      } 
      else {
        await this.getChats(dispatch);
        window.store.setChat([]);

      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ChatService();
