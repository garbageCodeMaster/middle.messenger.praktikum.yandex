import { Block, Store } from 'core';
import ChatService from 'services/chat';
import { withStoreChat } from 'utils';

interface ChatListProps {
  store: Store<AppState>;
  chats: Chat[];
  onUpdate?: any;
}


export class ChatList extends Block {
  static componentName = 'ChatList';
  
  constructor({ chats, onUpdate }: ChatListProps) {
    super({ chats, onUpdate });

    this.setState({ chat: null });
    this.setProps({ onClick: this.selectChat.bind(this) });
  }


  selectChat(chat: Chat) {
    let chatInState = this.state.chat;
    const chats = window.store.getState().chats;

    if (chatInState !== null) {
      if (!chats.find((chat: Chat) => chat.id === chatInState.id)) {
        chatInState = null;
      } else {
        if (chat.id !== chatInState.id) {
          chatInState.selected = false; 
        } else {
          return false;
        }
      }
    }

    const userId = window.store.getState().user!.id;

    if (chat.id && userId) {
      window.store.dispatch(ChatService.connectSocket, { userId, chatId: chat.id }); 
    }
  
    chat.selected = true;
    const {lastMessage: _, ...newChat} = chat;
    this.setState({chat: newChat});

    if (chatInState !== null)
      window.store.setChat([chat, chatInState]);
    else 
      window.store.setChat([chat]);
    
    return true;
  }
  
  render() {
    return `
      <ul class="chat-menu__chats scrollbar">
        {{#each chats}}
            {{{Chat chat=this onClick=../onClick selected=selected}}}
        {{/each}}
      </ul>
    `;
  }
}

export default withStoreChat(ChatList);
