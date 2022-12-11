import { Block } from 'core';

import addUser from 'icons/plus-circle.svg';
import deleteUser from 'icons/user-x.svg';
import deleteChat from 'icons/trash-bin.svg';

import '../card.scss';

interface CardProps {
    error?: string;
    onAdd?: () => void;
    onDelete?: () => void;
    onDeleteChat?: () => void;
}

export class ChatCard extends Block {
  static componentName = 'ChatCard';

  constructor(props: CardProps) {
    super(props);
  }

  showModal(btn: EventTarget): void {
    this.getContent().style.display = 'block';

    let click: (event: MouseEvent) => void;
    window.addEventListener('click' , click = (event: MouseEvent) => {
      if (event.target != btn) {
        this.getContent().style.display = 'none';
        window.removeEventListener('click', click, false);
      }
    });
  }

  render(): string {
    return `
  <div class="modal modal--bottom">
    <div class="card">
      {{#Button class="managment-button" type="button" onClick=onAdd}}
        <img src=${addUser} alt="add">
        <div class="managment-label">Add user</div>
      {{/Button}}

      {{#Button class="managment-button" type="button" onClick=onDelete}}
        <img src=${deleteUser} alt="remove">
        <div class="managment-label">Delete user</div>
      {{/Button}}

      {{#Button class="managment-button" type="button" onClick=onDeleteChat}}
        <img src=${deleteChat} alt="delete chat" width="24px">
        <div class="managment-label">Delete chat</div>
      {{/Button}}
    </div>
  </div>
        `;
  }
}
