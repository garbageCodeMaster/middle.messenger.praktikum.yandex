import Block from 'core/Block';

import './input.scss';

interface InputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  id?: string;
  name?: string;
  class?: string;
  disabled?: boolean;
}

export class Input extends Block {
  static componentName = 'Input';

  constructor({
    onInput, onFocus, onBlur, onChange, ...props
  }: InputProps) {
    super({
      ...props,
      events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur,
        change: onChange,
      },
    });
  }

  protected render(): string {
    return `
      <input class="{{#if class}}{{class}}{{else}}input__field{{/if}}" 
        name="{{name}}" 
        type="{{type}}" 
        {{#if id}}id="{{id}}"{{/if}} 
        {{#if value}}value="{{value}}"{{/if}} 
        {{#if disabled}}disabled{{/if}} 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
      >
    `;
  }
}
