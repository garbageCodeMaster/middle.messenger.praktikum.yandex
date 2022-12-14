import { PathRouter } from 'core';
import { Block } from 'core';
import { withRouter } from 'utils';


interface Page404Props {
  router: PathRouter;
  onNavigateNext?: () => void;
}

export class Page404 extends Block {
  static componentName = 'Page404';

  constructor(props: Page404Props) {
    super(props);

    this.setProps({
      onNavigateNext: this.onNavigateNext.bind(this),
    })
  }

  onNavigateNext() {
    if (window.store.getState().user) {
      window.router.go('/messenger');
    } else {
      window.router.go('/login');
    }
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

      {{#Button class="link-button" type="button" onClick=onNavigateNext}}back to chats{{/Button}}
    </div>
    `;
  }
}

export default withRouter(Page404);
