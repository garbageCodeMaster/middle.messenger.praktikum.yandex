import Block from 'core/Block';

import '../card.scss';

interface CardProps {
    error?: string;
    add?: boolean;
}

export class ManagmentCard extends Block {
  static componentName = 'ManagmentCard';

  constructor({ error }: CardProps) {
    super({ error });

    this.setProps({
      onAdd: () => {
        console.log('AAAAAAAAADD');
        this.hide();
      },
      onDelete: () => {
        console.log('DEEEEEELETE');
        this.hide();
      }
    });
  }

  protected render(): string {
    return `
<div class="absolute absolute--middle">
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
                        <input type="text" class="input__field" name="login" required/>
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
