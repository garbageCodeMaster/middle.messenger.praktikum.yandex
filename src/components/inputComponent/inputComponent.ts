import { Block } from 'core';
import { validateForm } from 'utils';

import './input.scss';

interface InputComponentProps {
  inputType: number;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  name?: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
}

export class InputComponent extends Block {
  static componentName = 'InputComponent';

  constructor(props: InputComponentProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;

        if (!inputEl.value) {
          const validateData = [{
            inputType: props.inputType,
            inputValue: inputEl.value,
          }];

          const errorMessage = validateForm(validateData);
          this.refs.errorRef.setProps({ textError: errorMessage[props.inputType] });
        }
      },
      onInput: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;

        if (inputEl.value) {
          const validateData = [{
            inputType: props.inputType,
            inputValue: inputEl.value,
            inputValueCompare: inputEl.value,
          }];

          const errorMessage = validateForm(validateData);
          this.refs.errorRef.setProps({ textError: errorMessage[props.inputType] });
        }
      },
    });
  }

  protected render(): string {
    return `
        <div class="input">
          {{{Input 
            name="{{name}}"
            type="{{type}}"
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            ref="input"
          }}}
          
          <label class="input__label">{{label}}</label>

          {{{Error
            ref="errorRef"
            textError=textError 
          }}}
        </div>
    `;
  }
}
