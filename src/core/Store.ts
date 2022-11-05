import EventBus from './EventBus';
import {set} from 'utils/set'
import { isEqual, merge } from 'utils';

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

    this.props = this._makePropsProxy(defaultState);
    this.state = defaultState;
    this.set(defaultState);
  }

  _makePropsProxy(props: any): any {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const prevState = this.state;
        target[prop] = value;

        if (prop === 'chats') {
          console.log("1111", target, window.store);
        }
        
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as any;
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
    Object.assign(this.props, {chats: newChatStore} );

    this.emit('chatChanged', this.state, prevState);
  }

  public setByPath(path: string, value: unknown) {
    const prevState = { ...this.state };

    set(this.state, path, value);

    this.emit('changed', prevState, this.state);
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };
    console.log('%cstore updated',
    'background: #4444; color: #fff',
    this.state, nextState, { ...this.state, ...nextState })
    this.state = { ...this.state, ...nextState };

    Object.assign(this.props, nextState);
   // this.state = {...this.state, nextState};
    this.emit('changed', prevState, {...this.state, nextState});
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      console.log('%cstore updated',
      'background: #333; color: #000',
      this.state, nextStateOrAction, { ...this.state, ...nextStateOrAction })

      this.set({  ...nextStateOrAction });
    }
  }
}
