import { formatDate } from 'utils';
import { WEBSOCKET_URL } from './types';

export default class Socket {
  private _webSocket: WebSocket;
  private _ping: ReturnType<typeof setInterval> | undefined;
  private _chatId: number;

  constructor(userId: number, chatId: number, token: string) {
    this._chatId = chatId;
    this._ping = undefined;
    this._webSocket = new WebSocket(`${WEBSOCKET_URL}${userId}/${chatId}/${token}`);
    this._setListeners();
  }

  private _setListeners() {
    this._webSocket.addEventListener("open", () => {
      this._getMessages();
  
      this._ping = setInterval(() => {
        this._webSocket.send(JSON.stringify({
          type: 'ping'
        }));
      }, 10000);
    });

    this._webSocket.addEventListener("message", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        let chats = window.store.getState().chats;
        let chat = chats.find(chat => this._chatId === chat.id);
    
        if (!chat) return;
        if (data.type !== 'user connected' &&
            data.type !== 'pong'
        ) {
          if (Array.isArray(data)) {
            chat.messages = data.map((message) => {
                const day = new Date(message.time);
                message.time = formatDate(day);
    
                return message;
            }).reverse();
            window.store.setChat(chats);
          }
          else {
            const day = new Date(data.time);
            data.time = formatDate(day);
            chat.messages.push(data);
            chat.lastMessage = data;
    
            window.store.setChat([chat]);
          }
        }
      }
      catch(error) {
        console.error(error);
      }
    });

    this._webSocket.addEventListener("close", () => {
      clearInterval(this._ping);
      this._webSocket.close();
    });
  }

  private _getMessages(count: string = '0') {
    this._webSocket.send(JSON.stringify({
      content: count,
      type: 'get old',
    }));
  }

  public sendMessage(message: string) {
    this._webSocket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }
};
