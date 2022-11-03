import MessengerPage from 'pages/messenger';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ProfilePage from 'pages/about';
import Page404 from 'pages/404';
import { BlockClass } from 'core';

export enum Screens {
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
  Page404 = 'page404',
  Messenger = 'messenger'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Messenger]: MessengerPage,
  [Screens.Login]: LoginPage,
  [Screens.Register]: RegisterPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Page404]: Page404,
  [Screens.Messenger]: MessengerPage
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
