import { Block } from 'core';

import './button.scss';

interface ButtonProps {
  text: string;
  type: 'submit' | 'button';
  class?: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
        <button {{#if class}}class="{{class}}"{{/if}} type="{{type}}" data-slot="1"></button>
    `;
  }
}
