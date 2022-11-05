import Block from 'core/Block';

import './message.scss';

interface MessageProps {
  message?: string;
  time?: string;
  user_id: number;
}

export class Message extends Block {
  static componentName = 'Message';

  constructor({ message, time, user_id }: MessageProps) {
    let type;
    console.log(user_id, window.store.getState().user!.id)
    if (user_id === window.store.getState().user!.id) {
      type = 'incoming';
    }
    else {
      type = 'outgoing';
    }
    
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
