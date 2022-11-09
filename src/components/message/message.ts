import Block from 'core/Block';

import './message.scss';

interface MessageProps {
  type?: string;
  message?: string;
  time?: string;
}

export class Message extends Block {
  static componentName = 'Message';

  constructor({ type = 'outgoing', message, time }: MessageProps) {
    super({ type, message, time });
  }

  protected render(): string {
    return `
    <div class="message message--{{type}}">
        {{{Avatar
          ref="AvatarRef"
          size="large"
          src="https://place-hold.it/57"
          onClick=onClick 
        }}}
        <div class="message-wrapper">
            <div class="message__content">
                <p>
                  {{message}}
                  <span class="message__time">{{time}}</span>
                </p>  
            </div>
        </div>
    </div>
    `;
  }
}
