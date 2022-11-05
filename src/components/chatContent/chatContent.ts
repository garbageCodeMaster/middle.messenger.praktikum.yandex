import Block from 'core/Block';
import ChatService from 'services/chat';

interface ChatContentProps {
  messages?: Record<string, unknown>;
  activeChat?: boolean;
  chatId?: number;
  status?: string;

  onClick?: () => void;
};

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
    console.log('add');
    this.refs.managmentCard.setProps({add: true, chatId: this.props.chatId});
    this.refs.managmentCard.show();
  }

  onDelete = () => {
    console.log('delete');
    this.refs.managmentCard.setProps({add: false, chatId: this.props.chatId});
    this.refs.managmentCard.show();
  }

  onDeleteChat = () => {
    console.log('delete');
    //this. = null;
    window.store.dispatch(ChatService.deleteChat);
  }

  render() {
    console.log("@@@@chat@@@@ render",this.props )

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
