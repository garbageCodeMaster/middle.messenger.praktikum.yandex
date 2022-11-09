import Block from 'core/Block';
import { getMyData } from 'utils/fakeData/getMyData';

import './about.scss';

export class AboutPage extends Block {
  static componentName = 'AboutPage';

  constructor() {
    const noEdit = true;
    const disabled = true;
    const fields = getMyData();

    super({ noEdit, disabled, fields });

    this.setProps({
      onDataChange: () => {
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
      },
      onPasswordChange: () => {
        const fields = [
          {
            key: 'old password',
            value: '',
            ref: 'oldPassword',
            type: 'password',
          },
          {
            key: 'new password',
            value: '',
            ref: 'oldPassword',
            type: 'password',
          },
          {
            key: 'repeat new password',
            value: '',
            ref: 'repeatPassword',
            type: 'password',
          },
        ];

        this.refs.InputsList.setProps({ fields, disabled: false });

        this.refs.ButtonsList.setProps({
          noEdit: false,
        });
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
          },
          {
            key: 'login',
            value: inputValue.login,
            ref: 'loginField',
            type: 'text',
          },
          {
            key: 'name',
            value: inputValue.name,
            ref: 'nameField',
            type: 'text',
          },
          {
            key: 'lastname',
            value: inputValue.lastname,
            ref: 'valueField',
            type: 'text',
          },
          {
            key: 'username',
            value: inputValue.username,
            ref: 'usernameField',
            type: 'text',
          },
          {
            key: 'phone',
            value: inputValue.phone,
            ref: 'phoneField',
            type: 'text',
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
      },
      onCardSubmit: () => {
        this.refs.UploadCard.hide();
      },
    });
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
