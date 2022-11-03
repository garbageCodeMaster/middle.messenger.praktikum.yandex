import Block from 'core/Block';
import { withUser, withStore, withRouter } from 'utils';

export class Page404 extends Block {
  static componentName = 'Page404';

  constructor() {
    super();
  }

  render() {
    return `
    <div class="error">
      <h1 class="error__title">
          404
      </h1>

      <h2 class="error__description">
          page not found...
      </h2>

      <a href="" class="link">back to chats</a>
    </div>
    `;
  }
}

export default withRouter(withStore(withUser(Page404)));
