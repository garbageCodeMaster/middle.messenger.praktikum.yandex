import Block from 'core/Block';

interface InputsListProps {
  fileds?: [];
  disabled?: boolean;
}

export class InputsList extends Block {
  static componentName = 'InputsList';

  constructor({ ...props }: InputsListProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="about__info">
        {{#each fields}}
            {{{Field
              key=key
              name=fieldValue
              value=value
              class="input-inline"
              type=type
              disabled=../disabled
              ref=ref
            }}}
        {{/each}}
      </div>
    `;
  }
}
