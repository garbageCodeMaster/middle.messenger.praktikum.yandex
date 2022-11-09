import Block from 'core/Block';

interface Chat {
  id: number;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number | 0;
  avatar: string | null;
}

interface ChatListProps {
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
    if (this.state.activeChat) {
      if ((chat.props.chat as Block).id !== this.state.activeChat.props.chat.id) {
        this.state.activeChat.setProps({ selected: false });
      } else {
        return false;
      }
    }

    this.setState({ activeChat: chat });
    (this.props.onUpdate as fun)(chat.props.chat);

    return true;
  }

  render() {
    return `
      <ul class="chat-menu__chats scrollbar">
        {{#each chats}}
            {{{Chat chat=this onClick=this.onClick selected=selected}}}
        {{/each}}
      </ul>
    `;
  }
}
