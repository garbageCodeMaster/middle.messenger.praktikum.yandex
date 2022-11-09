import Block from 'core/Block';

import messageUrl from 'icons/message-circle.svg';
import paperclipUrl from 'icons/paperclip.svg';

export class ChatForm extends Block {
  static componentName = 'ChatForm';

  constructor() {
    super();

    this.setProps({
      onClip: () => {
        this.refs.panelCard.show();
      },
      onSubmit: () => {
        const message = (this.refs.input.getContent() as HTMLInputElement).value;

        if (message.trim()) {
          this.refs.input.setProps({});
          console.log(message);
        }
      },
    });
  }

  render() {
    return `
      <form class="panel">
          {{#Button type="panel__button" ref="clipButton" onClick=onClip}}
              <img src=${paperclipUrl} alt="clip">
          {{/Button}}

          {{{TextArea
            ref="input"
            class="panel__input"
            name="textarea"
            placeholder="your text"
          }}}

          {{#Button type="panel__button" ref="enterButton" onClick=onSubmit}}
              <img src=${messageUrl} alt="enter">
          {{/Button}}

          {{{PanelCard
            ref="panelCard"
          }}}
      </form>
    `;
  }
}
