import { Block, Store } from 'core';
import ChatService from 'services/chat';
import { withStore } from 'utils';

interface ChatListProps {
  store: Store<AppState>;
  chats: Chat[];
  onUpdate?: any;
}

type fun = (P: any) => void;

export class ChatList extends Block {
  static componentName = 'ChatList';

  constructor({ chats, onUpdate }: ChatListProps) {
    super({ chats, onUpdate });

    this.setState({ activeChat: '' });
    this.selectChat = this.selectChat.bind(this);

    this.setProps({ chats: chats.map((chat) => ({ ...chat, onClick: this.selectChat })) });
  }

  selectChat(chat: Block) {
    this.setState({chat: (chat.props.chat as Block)});
    const chatId = (chat.props.chat as Block).id;

    if (this.state.activeChat) {
      if (chatId !== this.state.activeChat.props.chat.id) {
        this.state.activeChat.setProps({ selected: false });
      } else {
        return false;
      }
    }

    const userId = window.store.getState().user?.id;

    if (chatId && userId) {
      window.store.dispatch(ChatService.connectSocket, { userId, chatId });
    }

    
    console.log(this.props.onUpdate );
    window.store.on('changed', this.__onChangeStoreCallback);
    window.store.on('chatChanged', this.__onChangeStoreCallback2);
    
    this.setState({ activeChat: chat });
    return true;
  }
  
  private __onChangeStoreCallback = () => {
    (this.props.onUpdate as fun)(this.state.chat);
  }
  private __onChangeStoreCallback2 = () => {
    const chats = window.store.getState().chats;
    this.setProps({ chats: chats.map((chat) => ({ ...chat, onClick: this.selectChat })) });
    console.log('???????????????????????//', this.state)
  }

  render() {
    console.log("@@@@lsit@@@@ render")
    return `
      <ul class="chat-menu__chats scrollbar">
        {{#each chats}}
            {{{Chat chat=this onClick=this.onClick selected=selected}}}
        {{/each}}
      </ul>
    `;
  }
}

export default withStore(ChatList);
