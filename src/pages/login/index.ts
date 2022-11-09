import { renderDOM, registerComponent } from 'core';

import Layout from 'layouts';
import Button from 'components/button';
import InputComponent from 'components/inputComponent';
import Input from 'components/inputComponent/input';
import ErrorComponent from 'components/inputComponent/error';
import { LoginPage } from './login';

registerComponent(Layout);
registerComponent(Button);
registerComponent(Input);
registerComponent(ErrorComponent);
registerComponent(InputComponent);

document.addEventListener('DOMContentLoaded', () => {
  const page = new LoginPage();

  renderDOM(page);
});
