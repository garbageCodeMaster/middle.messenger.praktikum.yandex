import { renderDOM, registerComponent } from 'core';

import Layout from 'layouts';
import PanelCard from 'components/cards/panelCard';
import ChatContent from 'pages/messenger/chatContent';
import ChatForm from 'pages/messenger/chatForm';
import ChatList from 'pages/messenger/chatList';
import TextArea from 'components/textarea';
import Message from 'components/message';
import Profile from 'components/profile';
import Chat from 'components/chat';
import Button from 'components/button';
import Avatar from 'components/avatar';
import Input from 'components/inputComponent/input';
import { MessengerPage } from './messenger';

registerComponent(Layout);
registerComponent(PanelCard);
registerComponent(ChatList);
registerComponent(ChatForm);
registerComponent(TextArea);
registerComponent(ChatContent);
registerComponent(Message);
registerComponent(Profile);
registerComponent(Chat);
registerComponent(Button);
registerComponent(Avatar);
registerComponent(Input);

document.addEventListener('DOMContentLoaded', () => {
  const page = new MessengerPage();

  renderDOM(page);
});
