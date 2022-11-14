import { PathRouter, Store, Block } from 'core';
import { withRouter, withIsLoading } from 'utils';

import './messenger.scss';
import addUrl from 'icons/plus-circle.svg';

interface MessengerProps {
  router: PathRouter;
  store?: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
};

export class MessengerPage extends Block {
  static componentName = 'MessegerPage';

  constructor(props: MessengerProps) {
    const chats: Chat[] = window.store.getState().chats;
    chats.map(chat => chat.selected = false);

    super({...props, chats });

    this.setState({ activeChat: '' });

    this.setProps({
      onNavigateMyProfile: this.onNavigateMyProfile.bind(this),
      onClick: this.onClick.bind(this),
      onAdd: this.onAdd.bind(this),
      onSearchInput: () => {
        const search = (this.refs.input.getContent() as HTMLInputElement).value;
        const result = chats.filter((item) => item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        this.refs.chatList.setProps({ chats: result.map((chat) => ({ ...chat })) });
      },
    });
    
    this.refs.chatList.setProps({ onUpdate: this.chatContentUpdate.bind(this) });
  }

  chatContentUpdate(selectedChat: any) {
    if (selectedChat) {
      const chats = window.store.getState().chats;
      const messages = chats.find((chat: Chat) => chat.id === selectedChat.id);
      this.refs.chatContent.setProps({
        avatar: selectedChat.avatar,
        messages: messages?.messages,
        activeChat: selectedChat.selected,
        chatId: selectedChat.id,
        title: selectedChat.title,
        status: selectedChat.status,
      });
    }
    else {
      this.refs.chatContent.setProps({
        activeChat: false,
      });
    }
  }

  onNavigateMyProfile() {
    if (window.store.getState().user) {
      this.props.router.go('/profile');
    } else {
      this.props.router.go('/login');
    }
  }

  onClick(event: MouseEvent) {
    this.refs.chatContent.refs.chatCard.showModal(event.target);
  }

  onAdd() {
    this.refs.addChatCard.show();
  }

  render() {
    const {avatar, displayName} = window.store.getState().user!;

    return `
      {{#Layout}}
        <main class="messenger">
            <div class="chat-menu">
                <div class="chat-menu__header">
                  {{{Profile
                    avatar="${avatar}"
                    username="${displayName}"
                    status="short info about you"
                    onClick=onNavigateMyProfile
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

                      {{#Button class="panel__button" type="button" onClick=onAdd}}
                        <img src=${addUrl} alt="clip">
                      {{/Button}}

                      {{{AddChatCard
                        ref="addChatCard"
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
              messages=messages
              onClick=onClick
            }}}
        </main>
      {{/Layout}}
    `;
  }
}

export default withRouter(withIsLoading(MessengerPage));
