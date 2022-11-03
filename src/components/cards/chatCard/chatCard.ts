import Block from 'core/Block';

import addUser from 'icons/plus-circle.svg';
import deleteUser from 'icons/user-x.svg';

import '../card.scss';

interface CardProps {
    error?: string;
    onAdd?: () => void;
    onDelete?: () => void;
}

export class ChatCard extends Block {
  static componentName = 'ChatCard';

  constructor(props: CardProps) {
    super(props);
  }

  render(): string {
    return `
  <div class="absolute absolute--bottom">
    <div class="card">
      {{#Button type="managment-button" onClick=onAdd}}
        <img src=${addUser} alt="add">
        <div class="managment-label">Add user</div>
      {{/Button}}

      {{#Button type="managment-button" onClick=onDelete}}
        <img src=${deleteUser} alt="remove">
        <div class="managment-label">Delete user</div>
      {{/Button}}
    </div>
  </div>
        `;
  }
}
