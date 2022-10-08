import Block from 'core/Block';
import { getMessages, getChats } from 'utils';

import './messenger.scss';

type fun = (P: any) => void;

export class MessengerPage extends Block {
  static componentName = 'MessegerPage';

  constructor() {
    const chats = getChats();

    super({ chats });

    this.setState({ activeChat: '' });

    this.setProps({
      onSearchInput: () => {
        const search = (this.refs.input.getContent() as HTMLInputElement).value;
        const result = chats.filter((item) => item.username.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        this.refs.chatList.setProps({ chats: result.map((chat) => ({ ...chat, onClick: this.selectChat.bind(this) })) });
      },
    });

    this.refs.chatList.setProps({ onUpdate: this.chatContentUpdate.bind(this) });
  }

  selectChat(chat: Block) {
    if (this.state.activeChat) {
      if ((chat.props.chat as Block).id !== this.state.activeChat.props.chat.id) {
        this.state.activeChat.setProps({ selected: false });
      } else {
        return false;
      }
    }

    this.setState({ activeChat: chat });
    (this.refs.chatList.props.onUpdate as fun)(chat.props.chat);

    return true;
  }

  chatContentUpdate(props: any) {
    const messages = getMessages();

    this.refs.chatContent.setProps({
      messages,
      username: props.username,
      status: props.status,
    });
  }

  render() {
    return `
      {{#Layout}}
        <main class="messenger">
            <div class="chat-menu">
                <div class="chat-menu__header">
                  {{{Profile
                    name="your profile name"
                    status="short info about you"
                  }}}

                  <div class="search">
                      {{{Input
                        ref="input"
                        class="search__input"
                        name="search"
                        type="text"
                        placeholder="search"
                        onInput=onSearchInput
                      }}}
                  </div>
                </div>

                {{{ChatList 
                  ref="chatList"
                  chats=chats
                  onUpdate=onUpdate
                }}}
            </div>

            {{{ChatContent
              ref="chatContent"
              messages="{{messages}}"
            }}}
        </main>
      {{/Layout}}
    `;
  }
}
