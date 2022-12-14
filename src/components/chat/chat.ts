import { Block } from 'core';

import './chat.scss';

interface ChatProps {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  lastMessage: {
    user: User,
    time: string | Date,
    content: string,
  } | null;
  onClick: (B: Block) => boolean;
  selected: boolean;
}

export class Chat extends Block {
  static componentName = 'Chat';

  constructor({ onClick, ...chat }: ChatProps) {
    super({
      ...chat,
      events: {
        click: () => {
          if (onClick) {
            // @ts-expect-error
            onClick(this.props.chat);
          }
        },
      },
    });
  }

  protected render(): string {
    // @ts-expect-error
    const avatar = this.props.chat.avatar;
    return `
<li class="chat {{#if selected}}chat--active{{/if}}">
    {{{Avatar
      ref="AvatarRef"
      size="medium"
      src="${avatar}"
    }}}

    <div class="chat__content">
        <div class="chat__content-name">
            {{chat.title}}
        </div>
        <div class="chat__content-text">
            {{chat.lastMessage.content}}
        </div>
    </div>
    <div class="chat__time">
        {{chat.lastMessage.time}}
    </div>
</li>
    `;
  }
}
