import Block from 'core/Block';
import defaultAvatar from '/static/defaultAvatar/man.png';

import './message.scss';

interface MessageProps {
  message?: string;
  time?: string;
  user_id: number;
}

export class Message extends Block {
  static componentName = 'Message';

  constructor({ message, time, user_id }: MessageProps) {
    let type, avatar;
    if (user_id === window.store.getState().user!.id) {
      type = 'outgoing';
      avatar = window.store.getState().user!.avatar;
    }
    else {
      type = 'incoming';
      avatar = defaultAvatar;
    }
    
    super({ type, message, time, avatar });
  }

  protected render(): string {
    return `
    <div class="message message--{{type}}">
        {{{Avatar
          ref="AvatarRef"
          size="large"
          src=avatar
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
