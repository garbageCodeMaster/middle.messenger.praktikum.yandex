import Block from 'core/Block';
import { renderDOM, registerComponent } from 'core';
import Link from 'components/link';
import Layout from 'layouts';

interface OnboardingPageProps {
  links: Array<{text: string; to: string}>
}

 class OnboardingPage extends Block {
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

registerComponent(Link);
registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
  const page = new OnboardingPage({
    links: [
      { to: '/register', text: 'register' },
      { to: '/login', text: 'login' },
      { to: '/about', text: 'about page' },
      { to: '/messenger', text: 'messenger' },
      { to: '/404', text: '404' },
      { to: '/500', text: '500' },
    ],
  });

  renderDOM(page);
});
