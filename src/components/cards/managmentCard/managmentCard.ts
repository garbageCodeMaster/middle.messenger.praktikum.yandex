import { Block } from 'core';
import ChatService from 'services/chat';

import '../card.scss';

interface CardProps {
    add?: boolean;
    chatId?: number;
}

export class ManagmentCard extends Block {
  static componentName = 'ManagmentCard';

  constructor(props: CardProps) {
    super(props);

    this.setProps({
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const login = (this.refs.input.getContent() as HTMLInputElement).value;
        window.store.dispatch(this.props.add ? ChatService.addUsers : ChatService.deleteUsers, {logins: [login], chatId: this.props.chatId});

        this.hide();
      }
    });
  }

  protected render(): string {

    return `
<div class="modal modal--middle">
    {{#Form class="card card-column" ref="form" onSubmit=onSubmit}}  
        <h3 class="card__header">
            {{#if add}}
                Add new user
            {{else}}
                Delete user
            {{/if}}
        </h3>

        
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
                {{#Button class="action-button" type="submit"}}
                    {{#if add}}
                        Add
                    {{else}}
                        Delete
                    {{/if}}
                {{/Button}}
            </div>
    {{/Form}}
</div>
        `;
  }
}
