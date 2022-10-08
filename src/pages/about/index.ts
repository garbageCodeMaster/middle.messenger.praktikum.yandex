import { renderDOM, registerComponent } from 'core';

import Layout from 'layouts';
import UploadCard from 'components/cards/uploadCard';
import ButtonsList from 'pages/about/buttonsList';
import InputsList from 'pages/about/inputsList';
import Button from 'components/button';
import Field from 'components/field';
import Avatar from 'components/avatar';
import Input from 'components/inputComponent/input';
import { AboutPage } from './about';

registerComponent(Layout);
registerComponent(UploadCard);
registerComponent(ButtonsList);
registerComponent(InputsList);
registerComponent(Button);
registerComponent(Field);
registerComponent(Avatar);
registerComponent(Input);

document.addEventListener('DOMContentLoaded', () => {
  const page = new AboutPage();

  renderDOM(page);
});
