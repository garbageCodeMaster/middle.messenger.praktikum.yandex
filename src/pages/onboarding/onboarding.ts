import Block from 'core/Block';
import { withUser, withStore, withRouter } from 'utils';

import './onboarding.scss';

interface OnboardingPageProps {
  links: Array<{text: string; to: string}>
}

export class OnboardingPage extends Block {
  static componentName = 'OnboardingPage';

  constructor({ links }: OnboardingPageProps) {
    super({ links });
  }

  render() {
    return `
    {{#Layout}}
      <main class="home-page">
        <div>
          {{#each links}}
            {{#with this}}
              {{{Link text="{{text}}" to="{{to}}"}}}
            {{/with}}
          {{/each}}
        <div>
      </main>
    {{/Layout}}
    `;
  }
}

//export default withRouter(withStore(withUser(OnboardingPage)));
