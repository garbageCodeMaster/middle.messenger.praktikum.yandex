import EventBus from './EventBus';
import { merge, set } from 'utils';
import { AlertCard } from 'components';

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any,
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any,
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;
  public props: any;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }


  public getState() {
    return this.state;
  }

  public setChat(chatsUpdated: Chat[]) {
    const prevState = { ...this.state };

    let chatsInStore = [...this.getState().chats];
    
    chatsUpdated.forEach((chatUpdated: Chat) => {
      const chatInStore = chatsInStore.find((chatInStore: Chat | null) => chatUpdated!.id === chatInStore!.id);

      if (!chatInStore) {
        chatsInStore.unshift(chatUpdated);
      }
    });

    let newChatStore = chatsInStore.map((chatInStore: Chat) => {
        const chatUpdated = chatsUpdated.find((chatUpdated) => chatUpdated!.id === chatInStore!.id);

        if (chatUpdated) {
          return merge(chatInStore, chatUpdated);
        }

        return chatInStore;
    });
    
    this.state = {...this.state, ...{chats: newChatStore}}

    this.emit('chatChanged', this.state, prevState);  
  }

  public setByPath(path: string, value: unknown) {
    const prevState = { ...this.state };

    set(this.state, path, value);

    this.emit('changed', prevState, this.state);
  }

  public setApiMessage(value: {apiMessage: {message: string, type: "success" | "error"}}) {
    set(this.state, 'apiMessage', value);

    const message = value.apiMessage.message;
    const type = value.apiMessage.type;
    const alert = new AlertCard({message, type});
    document.body.prepend(alert.getContent());
  }

  public silentSet(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };

    this.emit('changed', prevState, {...this.state, nextState});
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({  ...nextStateOrAction });
    }
  }
}
