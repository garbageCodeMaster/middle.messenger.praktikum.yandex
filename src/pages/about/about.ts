import { PathRouter, Store, Block } from 'core';
import AuthService from 'services/auth';
import UserService from 'services/user';
import { withStore, withRouter, withIsLoading, validateForm, ValidateType } from 'utils';
import { getMyData } from 'utils';

import './about.scss';

interface AboutProps {
  router: PathRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
}

export class AboutPage extends Block {
  static componentName = 'AboutPage';

  constructor(props: AboutProps) {
    const {user} = window.store.getState();
 
    const noEdit = true;
    const disabled = true;
    
    const fields = getMyData(user as User);
    const avatar = user!.avatar;

    super({ ...props, noEdit, disabled, fields, avatar });

    this.setProps({
      onExit: this.onExit.bind(this),
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

        this.setState({ action: "editData" });
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
            key: 'repeatPassword',
            value: '',
            ref: 'repeatPassword',
            type: 'password',
            fieldValue: 'repeat new password',
          },
        ];

        this.setProps({ fields: fields, disabled: false });

        this.refs.ButtonsList.setProps({
          noEdit: false,
        });

        this.setState({ action: "editPassword" });
      },
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const inputValue = {} as Record<string, unknown>;
        Object.values(this.refs.InputsList.refs).forEach((field: Block) => {
          // @ts-expect-error
          inputValue[field.props.key] = (field.refs.input.getContent() as HTMLInputElement).value;
        });

        const fields = getMyData(window.store.getState().user as User);

        if (this.state.action === "editPassword") {
          const validation = validateForm([
            {
              inputType: ValidateType.OldPassword,
              inputValue: inputValue.oldPassword as string,
            },
            {
              inputType: ValidateType.Password,
              inputValue: inputValue.newPassword as string,
            },
            {
              inputType: ValidateType.PasswordCheck,
              inputValue: inputValue.repeatPassword as string,
              inputValueCompare: inputValue.newPassword as string,
            },
          ]);

          if (Object.values(validation).some((error: string) => error.length > 0)) {
            window.store.setApiMessage({ apiMessage: {
              message: `${Object.values(validation).join(' ')}`,
              type: 'error' 
            }});

            this.refs.InputsList.refs.oldPassword.refs.error.setProps({ textError: validation[ValidateType.OldPassword] });
            this.refs.InputsList.refs.newPassword.refs.error.setProps({ textError: validation[ValidateType.Password] });            
            this.refs.InputsList.refs.repeatPassword.refs.error.setProps({ textError: validation[ValidateType.PasswordCheck] });
  
            return;
          }
        } 
        else if(this.state.action === "editData") {
          const validation = validateForm([
            {
              inputType: ValidateType.Login,
              inputValue: inputValue.login as string,
            },
            {
              inputType: ValidateType.Email,
              inputValue: inputValue.email as string,
            },
            {
              inputType: ValidateType.Name,
              inputValue: inputValue.display_name as string,
            },
            {
              inputType: ValidateType.Phone,
              inputValue: inputValue.phone as string,
            },
          ]);

          if (Object.values(validation).some((error: string) => error.length > 0)) {
            window.store.setApiMessage({ apiMessage: {
              message: `${Object.values(validation).join(' ')}`,
              type: 'error' 
            }});
            
            this.refs.InputsList.refs.phoneField.refs.error.setProps({ textError: validation[ValidateType.Phone] });
            this.refs.InputsList.refs.loginField.refs.error.setProps({ textError: validation[ValidateType.Login] });
            this.refs.InputsList.refs.emailField.refs.error.setProps({ textError: validation[ValidateType.Email] });
  
            return;
          }
        }

        this.setProps({ fields, disabled: true });
        
        this.refs.AvatarRef.setProps({
          events: {
            click: () => {},
          },
        });

        this.refs.ButtonsList.setProps({
          noEdit: true,
        });


        window.store.dispatch(this.state.action === "editData" ? UserService.editData : UserService.editPassword, inputValue);
      },
      onFileSelected: (event: InputEvent) => {
        const { files }: { files: FileList | null } = event.target as HTMLInputElement;

        if (!files?.length) {
          return;
        }

        const [file] = files;

        this.setState({file: file});
        this.refs.UploadCard.refs.file.setProps({label: file.name});
      },
      onCardSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        
        if (!this.state.file || this.state.file === null) {
          return;
        }

        const file = new FormData();
        file.append("avatar", this.state.file);

        window.store.dispatch(UserService.uploadAvatar, file);
        this.setState({file: null});
        this.refs.UploadCard.refs.file.setProps({label: null});
        this.refs.UploadCard.hide();
      },
    });
  }

  onExit() {
    window.store.dispatch(AuthService.logout);
  }

  render() {
    const {user} = window.store.getState();
    const avatar = user!.avatar;

    return `
    {{#Layout}}
      <div>
        {{#Form class="about" ref=form onSubmit=onSubmit}}
            {{{Avatar
              ref="AvatarRef"
              size="gargantuan"
              src="${avatar}"
              onClick=onClick 
            }}}
            
            <h2 class="about__name">${user?.displayName || "No username"}</h2>

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
            }}}
        {{/Form}}
         
        {{{UploadCard
            ref="UploadCard"
            error=error
            onSubmit=onCardSubmit
            onChange=onFileSelected
        }}}
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(AboutPage)));
