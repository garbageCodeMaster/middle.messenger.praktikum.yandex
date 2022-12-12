import { Block } from 'core';

import './profile.scss';

interface ProfileProps {
  username?: string;
  status?: string;
  avatar?: string;

  onClick?: () => void;
}


export class Profile extends Block {
  static componentName = 'Profile';

  constructor({ username, status, avatar, onClick}: ProfileProps) {
    super({ username, status, avatar, onClick});
  }

  protected render(): string {
    return `
<div class="profile">
    <div class="profile__content">
      {{{Avatar
        ref="AvatarRef"
        size="large"
        src=avatar
        onClick=onAvatarClick 
      }}}
        <div class="profile-info">
            <div class="profile-info__name">
                {{username}}
            </div>
            <div class="profile-info__text">
                {{status}}
            </div>
        </div>
    </div>
    <div class="profile__settings">
      {{#Button class="settings-button" type="button" onClick=onClick}}settings{{/Button}}
    </div>
</div>
    `;
  }
}
