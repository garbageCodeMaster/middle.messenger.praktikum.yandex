import { Block } from 'core';
import ChatService from 'services/chat';

interface ChatContentProps {
  messages?: Record<string, unknown>;
  title?: string;
  activeChat?: boolean;
  avatar?: string;
  chatId?: number;
  status?: string;

  onClick?: () => void;
}

export class ChatContent extends Block {
  static componentName = 'ChatContent';

  constructor(props: ChatContentProps) {
    super(props);

    this.setProps({
      onAdd: this.onAdd.bind(this),
      onDelete: this.onDelete.bind(this),
      onDeleteChat: this.onDeleteChat.bind(this),
    });
  }

  scrollToBottom() {
    const chatContent = document.getElementsByClassName('chat-content__chat')[0];
    if (!chatContent) return;
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onAdd = () => {
    this.refs.managmentCard.setProps({add: true, chatId: this.props.chatId});
    this.refs.managmentCard.show();
  }

  onDelete = () => {
    this.refs.managmentCard.setProps({add: false, chatId: this.props.chatId});
    this.refs.managmentCard.show();
  }

  onDeleteChat = () => {
    window.store.dispatch(ChatService.deleteChat);
  }

  render() {
    if (!this.props.activeChat) {
      return `
        <div class="chat-content">
          <div class="nothing">Nothing yet</div>
        </div>
      `;
    }
    else {
      return `
        <div class="chat-content">
          <div class="chat-content__header">
            {{{Profile
              ref="Profile"
              username=title
              status=status
              onClick=onClick
              avatar=avatar
            }}}

            <div style="position: relative">
              {{{ChatCard
                ref="chatCard"
                onAdd=onAdd
                onDelete=onDelete
                onDeleteChat=onDeleteChat
              }}}
            </div> 
          </div>

          <div class="chat-content__chat scrollbar">
            {{#each messages}}
              {{{Message
                message=content
                user_id=user_id
                time=time
              }}}
            {{/each}}
          </div>

          {{{ChatForm}}}

          {{{ManagmentCard
              ref="managmentCard"
          }}}
        </div>
          `;
    }
  }
}
