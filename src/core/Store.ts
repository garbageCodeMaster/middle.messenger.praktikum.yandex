import EventBus from './EventBus';
import {set} from 'utils/set'
import { merge } from 'utils';

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

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public setChat(chatUpdated: Chat[]) {
    const prevState = { ...this.state };

    let chats = this.getState().chats;
    const chatInStore = chats.find((chat: Chat) => chat.id === chatUpdated[0].id);

    const newChatStore = chats.map((chat: Chat, i: number) => {
      return merge(chat, chatUpdated[i]);
    });

    console.log("merge: ", newChatStore, chatInStore, chatUpdated)


    this.state = {...this.state, ...{chats: newChatStore}}

    this.emit('chatChanged', prevState, this.state);
  }

  public setByPath(path: string, value: unknown) {
    const prevState = { ...this.state };

    set(this.state, path, value);

    this.emit('changed', prevState, this.state);
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit('changed', prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
