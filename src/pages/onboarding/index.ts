import { renderDOM, registerComponent } from 'core';

import Link from 'components/link';
import Layout from 'layouts';
import { OnboardingPage } from './onboarding';

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
