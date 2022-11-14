import Block from 'core/Block';

import './avatar.scss';

interface AvatarProps {
  size: string;
  src: string;
  onClick?: () => void;
}

export class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({ size, src, onClick }: AvatarProps) {
    super({ size, src, events: { click: onClick } });
  }

  protected render(): string {
    return `
    <div class="profile-picture">
        <img src="{{src}}" class="profile-img profile-picture--{{size}}" alt="profile picture">
    </div>
    `;
  }
}
