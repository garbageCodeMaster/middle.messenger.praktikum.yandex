import { renderDOM, registerComponent, PathRouter, Store } from 'core';
import InitService from './services/initApp';
import { defaultState } from './store';
import { initRouter } from './router';

import './styles/styles.scss';

import * as components from './components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: PathRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  window.router = router;
  window.store = store;

  initRouter(router, store);
  store.dispatch(InitService.initApp);
});
