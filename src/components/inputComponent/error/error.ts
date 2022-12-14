import { Block } from 'core';

import './input.scss';

interface ErrorProps {
  textError?: string;
}

export class Error extends Block {
  static componentName = 'Error';

  constructor({ textError }: ErrorProps) {
    super({ textError });
  }

  protected render(): string {
    return `
      <div class="input__error">{{#if textError}}{{textError}}{{/if}}</div>
    `;
  }
}
