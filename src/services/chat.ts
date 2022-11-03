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
    this.searchUser = this.searchUser.bind(this);
    this.addUsers = this.addUsers.bind(this);
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

      chat.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          console.log(day)
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
          console.log(day)
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
    chats.map((chat) => {
      if (chat.last_message) {
        const day = new Date(chat.last_message.time);
        console.log(day)
        chat.last_message.time = day;
      }
    });

    dispatch({ chats: transformChat(chats as ChatDTO[]) });
    
  } catch (error) {
    console.error(error);
  }
  }

  public async addUsers(
    dispatch: Dispatch<AppState>,
    state: AppState,
    logins: string[], 
    chatId: number,
  ): Promise<void> {
    try {
        const users = []
      
        for (const login of logins) {
          const user = await this.searchUser(login); 

          if (!user || user.length === 0) {
            console.error(`No user with login: ${login}`);
            continue;
          }

          users.push(user[0].id);
        }
      
        console.log(users);
      // const users = await logins.reduce<Promise<UserDTO[]>>(async (result, login) => {
      //   const user = await this.searchUser(login);

      //   if (!user || user.length === 0) {
      //     console.error(`No user with login: ${login}`);
      //   }
      //   else {
      //     await result;
      //   }

      // }, Promise.resolve([]));
      



      const response = await this.api.addUsers(users, chatId);

      if (apiHasError(response)) {
        console.error(response.reason);
        return;
      } 
      
      // this.getChat( );
    } 
    catch (error) {
      console.error(error);
    }
  }

  public async connectSocket(
    dispatch: Dispatch<AppState>,
    state: AppState,
    ids: {chatId: number, userId: number}
    ) {
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
    ) {
    try {
      console.log("call sendMessage")
      if (this.socket) {
        this.socket.sendMessage(message);

        if (this.curentChat) {
          console.log(this.curentChat, 'diougndsoujfnjbinsfdjibnsudfnbpun')
          await this.getChat(this.curentChat);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}




// public async deleteUser(login: string, chatId: number) {
//   try {
//     const user = await this._profileService.searchUser(login);
//     if (hasResponseError(user)) {
//       console.error(user.reason);
//       return;
//     }

//     if (!user) return;
//     if (user.length === 0) {
//       console.error(`Не найден пользователь с id ${login}`);
//       return;
//     }

//     const result = await this._chatAPI.deleteUsers([user[0].id as unknown as number], chatId);
//     if (hasResponseError(result)) {
//       console.error(result.reason);
//     } else {
//       await this.getChats();
//       closeModal('delete-user');
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// public async deleteChat(id: number) {
//   try {
//     const result = await this._chatAPI.deleteChat(id);
//     if (hasResponseError(result)) {
//       console.error(result.reason);
//     } else {
//       await this.getChats();
//       store.set('currentChat.chat', null);
//       closeModal('delete-chat');
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

export default new ChatService();
