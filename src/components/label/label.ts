import { Block } from 'core';

import './label.scss';

interface LabelProps {
  label: string;
  type?: "success" | "error";
}

export class Label extends Block {
  static componentName = 'Label';

  constructor(props: LabelProps) {

    super(props);
  }

  protected render(): string {
    return `
      <div class="{{#if type}}label-{{type}}{{else}}card__main-file{{/if}}">
          {{label}}
      </div>
    `;
  }
}
