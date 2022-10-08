import Block from 'core/Block';

import './profile.scss';

interface ProfileProps {
  username?: string;
  status?: string;
}

export class Profile extends Block {
  static componentName = 'Profile';

  constructor({ username, status }: ProfileProps) {
    super({ username, status });
  }

  protected render(): string {
    return `
<div class="profile">
    <div class="profile__content">
      {{{Avatar
        ref="AvatarRef"
        size="large"
        src="https://place-hold.it/57"
        onClick=onClick 
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
      {{#Button type="settings-button"}}settings{{/Button}}
    </div>
</div>
    `;
  }
}
