import Block from 'core/Block';

interface ChatContentProps {
  messages?: Record<string, unknown>;
  activeChat?: boolean;
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
    this.refs.managmentCard.setProps({add: true});
    this.refs.chatCard.hide();
    this.refs.managmentCard.show();
  }

  onDelete = () => {
    console.log('delete');
    this.refs.managmentCard.setProps({add: false});
    this.refs.chatCard.hide();
    this.refs.managmentCard.show();
  }

  render() {
    console.log("@@@@chat@@@@ render")
    return `
<div class="chat-content">
    {{#unless activeChat}}
        <div class="nothing">Nothing yet</div>
    {{else}}
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
            }}}

          </div> 
        </div>

        <div class="chat-content__chat scrollbar">
          {{#each messages}}
            {{{Message
              message=content
              type="{{type}}"
              time=time
            }}}
          {{/each}}
        </div>

        {{{ChatForm}}}

        {{{ManagmentCard
            ref="managmentCard"
        }}}
    {{/unless}}
</div>
    `;
  }
}
