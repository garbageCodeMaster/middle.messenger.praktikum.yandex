import { BlockClass, Store } from 'core';

type WithStateProps = { store: Store<AppState> };
type fun = (Pr: any) => void;

export function withStoreChat<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      console.log("withStoreChat@");
      console.log(props)
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      console.log("||||||||||||||||||||||||||||||||||");
      
      const chats = window.store.getState().chats;
      const selectedChat = chats.find((chat: Chat) => chat.selected);
      // @ts-expect-error this is not typed
      (this.props.onUpdate as fun)(selectedChat);

      // @ts-expect-error this is not typed
      this.setProps({ chats: chats.map((chat) => ({ ...chat, onClick: this.selectChat })) });
    }

    componentDidMount(props: P) {
      console.log("mount", this)
      super.componentDidMount(props);
      window.store.on('chatChanged', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      console.log("unmount", this)
      super.componentWillUnmount();
      window.store.off('chatChanged', this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}
