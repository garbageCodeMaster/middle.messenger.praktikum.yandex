import Block from 'core/Block';

import messageUrl from 'icons/message-circle.svg';
import paperclipUrl from 'icons/paperclip.svg';
import ChatService from 'services/chat';

export class ChatForm extends Block {
  static componentName = 'ChatForm';

  constructor() {
    super();

    this.setProps({
      onClip: () => {
        this.refs.panelCard.show();
      },
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const message = (this.refs.input.getContent() as HTMLInputElement).value.trim();

        if (message) {
          this.refs.input.setProps({});
          console.log(message);
          window.store.dispatch(ChatService.sendMessage, message);
        }

      },
    });
  }

  render() {
    return `
      {{#Form class="panel" ref="form" onSubmit=onSubmit}}
          {{#Button class="panel__button" type="button" ref="clipButton" onClick=onClip}}
              <img src=${paperclipUrl} alt="clip">
          {{/Button}}

          {{{TextArea
            ref="input"
            class="panel__input"
            name="textarea"
            placeholder="your text"
          }}}

          {{#Button class="panel__button" type="button" ref="enterButton" onClick=onSubmit}}
              <img src=${messageUrl} alt="enter">
          {{/Button}}

          {{{PanelCard
            ref="panelCard"
          }}}
      {{/Form}}
    `;
  }
}
