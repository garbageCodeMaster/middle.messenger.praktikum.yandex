import Block from 'core/Block';

import './button.scss';

interface ButtonProps {
  text: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ text, type, onClick }: ButtonProps) {
    super({ text, type, events: { click: onClick } });
  }

  protected render(): string {
    return `
        <button class="{{type}}" type="button" data-slot="1"></button>
    `;
  }
}
