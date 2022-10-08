import Block from 'core/Block';

export class ChatContent extends Block {
  static componentName = 'ChatContent';

  constructor() {
    super();
  }

  scrollToBottom() {
    const chatContent = document.getElementsByClassName('chat-content__chat')[0];
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return `
<div class="chat-content">
    {{#unless messages}}
        <div class="nothing">Nothing yet</div>
    {{else}}
        <div class="chat-content__header">
          {{{Profile
            ref="Profile"
            username="{{username}}"
            status="{{status}}"
          }}}
        </div>

        <div class="chat-content__chat scrollbar">
          {{#each messages}}
            {{{Message
              message="{{message}}"
              type="{{type}}"
              time="{{time}}"
            }}}
          {{/each}}
        </div>

        {{{ChatForm}}}
    {{/unless}}
</div>
    `;
  }
}
