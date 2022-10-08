import { renderDOM, registerComponent } from 'core';

import Layout from 'layouts';
import Link from 'components/link';
import Button from 'components/button';
import InputComponent from 'components/inputComponent';
import Input from 'components/inputComponent/input';
import ErrorComponent from 'components/inputComponent/error';
import { RegisterPage } from './register';

registerComponent(Layout);
registerComponent(Button);
registerComponent(Input);
registerComponent(Link);
registerComponent(ErrorComponent);
registerComponent(InputComponent);

document.addEventListener('DOMContentLoaded', () => {
  const page = new RegisterPage();

  renderDOM(page);
});
