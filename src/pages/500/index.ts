import { renderDOM } from 'core';
import { Page500 } from './500';

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page500();

  renderDOM(page);
});
