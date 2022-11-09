import Block from 'core/Block';

import './layout.scss';

export class Layout extends Block {
  static componentName = 'Layout';

  constructor() {
    super();
  }

  protected render(): string {
    return `
        <div class="container" data-slot="1"></div>
    `;
  }
}
