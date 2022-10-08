import Block from 'core/Block';

import './field.scss';

interface FieldProps {
  key: string;
  value: string;
  type?: string;
  disabled?: boolean;
}

export class Field extends Block {
  static componentName = 'Field';

  constructor({
    key, value, type, disabled,
  }: FieldProps) {
    super({
      key, value, type, disabled,
    });
  }

  protected render(): string {
    return `
    <div class="field">
        <div class="field__key">
            {{key}}
        </div>
        <div class="field__value">
            {{{Input
              name=key
              type="{{type}}"
              value="{{value}}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
              class="input-inline"
              ref="input"
              disabled=disabled
            }}}
        </div>
    </div>
    `;
  }
}
