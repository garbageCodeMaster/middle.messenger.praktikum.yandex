import Block from 'core/Block';
import { PathRouter } from 'core';
import { withRouter } from 'utils';

interface Page500Props {
  router: PathRouter;
  onNavigateNext?: () => void;
};

export class Page500 extends Block {
  static componentName = 'Page404';

  constructor(props: Page500Props) {
    super(props);

    this.setProps({
      onNavigateNext: this.onNavigateNext.bind(this),
    })
  }

  onNavigateNext() {
    if (window.store.getState().user) {
      this.props.router.go('/messenger');
    } else {
      this.props.router.go('/login');
    }
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

      {{#Button class="link-button" type="button" onClick=onNavigateNext}}back to chats{{/Button}}
    </div>
    `;
  }
}

export default withRouter(Page500);
