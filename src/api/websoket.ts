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
    this._webSocket.addEventListener("open", this._onOpen.bind(this));
    this._webSocket.addEventListener("message", this._onMessage.bind(this));
    this._webSocket.addEventListener("close", this._onClose.bind(this));
  }

  private _onOpen() {
    this._getMessages();

    this._ping = setInterval(() => {
      this._webSocket.send(JSON.stringify({
        type: 'ping'
      }));
    }, 10000);
  }

  private _onClose() {
    clearInterval(this._ping);
    this._webSocket.close();
    this._webSocket.removeEventListener("open", this._onOpen);
    this._webSocket.removeEventListener("message", this._onMessage);
    this._webSocket.removeEventListener("close", this._onClose);
  }

  private _onMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    let chats = Array.from(window.store.getState().chats);
    let chat = chats.find(chat => this._chatId === chat.id);

    console.log("onMessage", data)

    if (!chat) return;
    if (data.type !== 'user connected' &&
        data.type !== 'pong'
    ) {
      if(Array.isArray(data)) {
        chat.messages = data.reverse();
      }
      else {
        chat.messages.push(data);
      }
      window.store.setByPath('chats', chats)
      console.log("onMessage22", window.store.getState().chats)
    }

  }

  private _getMessages(count: string = '0') {
    this._webSocket.send(JSON.stringify({
      content: count,
      type: 'get old',
    }));
  }

  public sendMessage(message: string) {
    console.log("sendMessage")
    this._webSocket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }
};
