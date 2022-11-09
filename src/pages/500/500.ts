import Block from 'core/Block';

export class Page500 extends Block {
  static componentName = 'Page404';

  constructor() {
    super();
  }

  render() {
    return `
    <div class="error">
      <h1 class="error__title">
          500
      </h1>

      <h2 class="error__description">
          something went wrong...
      </h2>

      <a href="./messenger.hbs" class="link">back to chats</a>
    </div>
    `;
  }
}
