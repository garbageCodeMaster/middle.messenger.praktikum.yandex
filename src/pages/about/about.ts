import { PathRouter, Store, Block } from 'core';
import AuthService from 'services/auth';
import UserService from 'services/user';
import { withStore, withRouter, withIsLoading } from 'utils';
import { getMyData } from 'utils/fakeData/getMyData';

import './about.scss';

interface AboutProps {
  router: PathRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
};

export class AboutPage extends Block {
  static componentName = 'AboutPage';

  constructor(props: AboutProps) {
    const noEdit = true;
    const disabled = true;
    const fields = getMyData(window.store.getState().user as User);

    super({ ...props, noEdit, disabled, fields });

    this.setProps({
      onExit: this.onExit.bind(this),
      onDataChange: () => {
        console.log(this.refs)
        Object.values(this.refs.InputsList.refs).forEach((field) => {
          field.refs.input.setProps({ ...(field.refs.input.getContent() as HTMLInputElement), disabled: false });
        });

        this.refs.AvatarRef.setProps({
          events: {
            click: () => {
              this.refs.UploadCard.show();
            },
          },
        });

        this.refs.ButtonsList.setProps({
          noEdit: false,
        });

        this.setState({ action: UserService.editData });
      },
      onPasswordChange: () => {
        const fields = [
          {
            key: 'oldPassword',
            value: '',
            ref: 'oldPassword',
            type: 'password',
            fieldValue: 'old password',
          },
          {
            key: 'newPassword',
            value: '',
            ref: 'newPassword',
            type: 'password',
            fieldValue: 'new password',
          },
          {
            key: 'repeatNewPassword',
            value: '',
            ref: 'repeatPassword',
            type: 'password',
            fieldValue: 'repeat new password',
          },
        ];

        this.refs.InputsList.setProps({ fields, disabled: false });

        this.refs.ButtonsList.setProps({
          noEdit: false,
        });

        this.setState({ action: UserService.editPassword });
      },
      onSubmit: () => {
        const inputValue = {} as Record<string, unknown>;
        Object.values(this.refs.InputsList.refs).forEach((field) => {
          inputValue[field.props.key] = (field.refs.input.getContent() as HTMLInputElement).value;
        });

        const fields = [
          {
            key: 'email',
            value: inputValue.email,
            ref: 'emailField',
            type: 'email',
            fieldValue: 'email',
          },
          {
            key: 'login',
            value: inputValue.login,
            ref: 'loginField',
            type: 'text',
            fieldValue: 'login',
          },
          {
            key: 'first_name',
            value: inputValue.first_name,
            ref: 'nameField',
            type: 'text',
            fieldValue: 'name',
          },
          {
            key: 'second_name',
            value: inputValue.second_name,
            ref: 'valueField',
            type: 'text',
            fieldValue: 'lastname',
          },
          {
            key: 'display_name',
            value: inputValue.display_name,
            ref: 'usernameField',
            type: 'text',
            fieldValue: 'username',
          },
          {
            key: 'phone',
            value: inputValue.phone,
            ref: 'phoneField',
            type: 'text',
            fieldValue: 'phone',
          },
        ];

        this.refs.InputsList.setProps({ fields, disabled: true });
        
        this.refs.AvatarRef.setProps({
          events: {
            click: () => {},
          },
        });

        this.refs.ButtonsList.setProps({
          noEdit: true,
        });

        this.props.store.dispatch(this.state.action, inputValue);
      },
      onCardSubmit: () => {
        this.refs.UploadCard.hide();
      },
    });
  }

  onExit() {
    window.store.dispatch(AuthService.logout);
  }

  render() {
    return `
    {{#Layout}}
      <main class="about">
          {{{Avatar
            ref="AvatarRef"
            size="gargantuan"
            src="https://place-hold.it/107"
            onClick=onClick 
          }}}

          <h2 class="about__name">dfdgfgd</h2>

          {{{InputsList 
            ref="InputsList" 
            fields=fields
            disabled=disabled
          }}}

          {{{ButtonsList 
            ref="ButtonsList" 
            noEdit="{{noEdit}}"
            onDataChange=onDataChange 
            onPasswordChange=onPasswordChange
            onExit=onExit
            onSubmit=onSubmit
          }}}

          {{{UploadCard
            ref="UploadCard"
            error=error
            onClick=onCardSubmit
          }}}
      </main>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(AboutPage)));
