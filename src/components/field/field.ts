import Block from 'core/Block';

import './field.scss';

interface FieldProps {
  key: string;
  value: string;
  type?: string;
  name?: string;
  disabled?: boolean;
}

export class Field extends Block {
  static componentName = 'Field';

  constructor({
    name, key, value, type, disabled,
  }: FieldProps) {
    super({
      name, key, value, type, disabled,
    });
  }

  protected render(): string {
    return `
    <div>
      <div class="field">
          <div class="field__key">
              {{name}}
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
      
      {{{Error
        ref="error"
        textError=textError 
      }}}
    </div>
    `;
  }
}
