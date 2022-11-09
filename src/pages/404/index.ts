import { renderDOM } from 'core';
import { Page404 } from './404';

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page404();

  renderDOM(page);
});
