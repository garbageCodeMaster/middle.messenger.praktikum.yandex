import { Store, renderDOM, PathRouter } from 'core';
import { getScreenComponent, Screens } from './utils';

const routes = [
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/register',
    block: Screens.Register,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Page404,
    shouldAuthorized: false,
  },
];

export function initRouter(router: PathRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
