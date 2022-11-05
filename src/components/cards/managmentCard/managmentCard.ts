import Block from 'core/Block';
import ChatService from 'services/chat';

import '../card.scss';

interface CardProps {
    error?: string;
    add?: boolean;
    chatId?: number;
}

export class ManagmentCard extends Block {
  static componentName = 'ManagmentCard';

  constructor({ error }: CardProps) {
    super({ error });

    this.setProps({
      onAdd: () => {
        const login = (this.refs.input.getContent() as HTMLInputElement).value;
        window.store.dispatch(ChatService.addUsers, {logins: [login], chatId: this.props.chatId});

        this.hide();
      },
      onDelete: () => {
        const login = (this.refs.input.getContent() as HTMLInputElement).value;
        window.store.dispatch(ChatService.deleteUser, {login: login, chatId: this.props.chatId});

        this.hide();
      }
    });
  }

  protected render(): string {
    return `
<div class="modal modal--middle">
    <div class="card">
        <h3 class="card__header">
            {{#if add}}
                Add new user
            {{else}}
                Delete user
            {{/if}}
        </h3>

        <form class="card-form">  
            <div class="card__main">
                <div class="input-list">
                    <div class="input">
                        {{{Input 
                            name="login"
                            type="text"
                            class="input__field"
                            ref="input"
                        }}}

                        <label class="input__label">login</label>
                    </div>
                </div>
            </div>

            <div class="card__action">
                {{#if add}}
                    {{#Button type="action-button" onClick=onAdd}}Add{{/Button}}
                {{else}}
                    {{#Button type="action-button" onClick=onDelete}}Delete{{/Button}}
                {{/if}}
            </div>
        </form> 
    </div>
</div>
        `;
  }
}
