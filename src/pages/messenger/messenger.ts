import { PathRouter, Store, Block } from 'core';
import ChatService from 'services/chat';
import { withStore, withRouter, withIsLoading } from 'utils';

import './messenger.scss';
import addUrl from 'icons/plus-circle.svg';

type fun = (P: any) => void;

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
    let chats: Chat[] = window.store.getState().chats;

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
//select пропадает нужно в пропсах прокидывать заново в onSearchInput

  chatContentUpdate(selectedChat: any) {
    debugger;
    if (selectedChat) {
      const chats = window.store.getState().chats;
      const messages = chats.find((chat: Chat) => chat.id === selectedChat.id);
      console.log("0000000000000", chats, messages, selectedChat)
      this.refs.chatContent.setProps({
        messages: messages?.messages,
        activeChat: selectedChat.selected,
        chatId: selectedChat.id,
        username: selectedChat.displayName,
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
    const search = (this.refs.input.getContent() as HTMLInputElement).value;
    //console.log(ChatService.searchUser(search));
    if (search) {
      window.store.dispatch(ChatService.addChat, search);
      this.refs.input.setProps({});
    }
  }

  render() {
    console.log("@@@@mes@@@@ render", this.refs)
    return `
      {{#Layout}}
        <main class="messenger">
            <div class="chat-menu">
                <div class="chat-menu__header">
                  {{{Profile
                    name="your profile name"
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
                      {{#Button type="panel__button" onClick=onAdd}}
                        <img src=${addUrl} alt="clip">
                      {{/Button}}
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
