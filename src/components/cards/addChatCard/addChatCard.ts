import Block from 'core/Block';
import ChatService from 'services/chat';

import '../card.scss';


export class AddChatCard extends Block {
  static componentName = 'AddChatCard';

  constructor() {
    super();

    this.setProps({
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const title = (this.refs.chatName.getContent() as HTMLInputElement).value;
        const login = (this.refs.login.getContent() as HTMLInputElement).value;

        if (title && login) {
           window.store.dispatch(ChatService.addChat, { title: title, logins: [login]}); 
        }
        
        this.hide();
      }
    });
  }

  protected render(): string {

    return `
<div class="modal modal--middle">
    {{#Form class="card card-column" ref="form" onSubmit=onSubmit}}  
        <h3 class="card__header">
            Create new Chat
        </h3>
        
        <div class="card__main">
            <div class="input-list">
                <div class="input">
                    {{{Input 
                        name="chatName"
                        type="text"
                        class="input__field"
                        ref="chatName"
                    }}}

                    <label class="input__label">chat name</label>
                </div>

                <div class="input">
                    {{{Input 
                        name="login"
                        type="text"
                        class="input__field"
                        ref="login"
                    }}}

                    <label class="input__label">user's login</label>
                </div>
            </div>
        </div>

        <div class="card__action">
            {{#Button class="action-button" type="submit"}}
                Create
            {{/Button}}
        </div>
    {{/Form}}
</div>
        `;
  }
}
