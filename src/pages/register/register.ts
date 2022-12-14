import { PathRouter, Store, Block } from 'core';
import AuthService from 'services/auth';
import { withStore, withRouter } from 'utils';
import { validateForm, ValidateType } from 'utils';

import './register.scss';

interface RegisterProps {
  router: PathRouter;
  store: Store<AppState>;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
}

export class RegisterPage extends Block {
  static componentName = 'RegisterPage';

  constructor(props: RegisterProps) {
    super(props);

    this.setProps({
      onNavigateNext: () => this.onNavigateNext(),
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const validateData = [
          {
            inputType: ValidateType.Login,
            inputValue: (this.refs.loginComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.Password,
            inputValue: (this.refs.passwordComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.PasswordCheck,
            inputValue: (this.refs.passwordCheckComponent.refs.input.getContent() as HTMLInputElement).value,
            inputValueCompare: (this.refs.passwordComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.Email,
            inputValue: (this.refs.emailComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.Name,
            inputValue: (this.refs.nameComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.Phone,
            inputValue: (this.refs.phoneComponent.refs.input.getContent() as HTMLInputElement).value,
          },
        ];

        const errorMessage = validateForm(validateData);

        const inputs = [
          {
            inputType: ValidateType.Login,
            input: this.refs.loginComponent,
          },
          {
            inputType: ValidateType.Password,
            input: this.refs.passwordComponent,
          },
          {
            inputType: ValidateType.PasswordCheck,
            input: this.refs.passwordCheckComponent,
          },
          {
            inputType: ValidateType.Email,
            input: this.refs.emailComponent,
          },
          {
            inputType: ValidateType.Name,
            input: this.refs.nameComponent,
          },
          {
            inputType: ValidateType.Phone,
            input: this.refs.phoneComponent,
          },
        ];

        inputs.forEach((error) => error.input.refs.errorRef.setProps({ textError: errorMessage[error.inputType] }));

        console.log('action/register', validateData[0].inputValue, validateData[1].inputValue, validateData[2].inputValue, validateData[3].inputValue, validateData[4].inputValue, validateData[5].inputValue);
        window.store.dispatch(AuthService.register, { 
          login: validateData[0].inputValue, 
          password: validateData[1].inputValue, 
          email: validateData[3].inputValue, 
          first_name: validateData[4].inputValue, 
          second_name: validateData[4].inputValue, 
          phone: validateData[5].inputValue 
        });
      },
    });
  }

  onNavigateNext() {
    window.router.go('/login');
  }

  render() {
    return `
      {{#Layout}}
        <main class="home-page">
          <div class="card card-column">
            {{#Form class="card-form" ref="form" onSubmit=onSubmit}}
              <div class="input-list">
                <div class="form-header">
                    Register
                </div>

                {{{InputComponent
                  inputType=${ValidateType.Email}
                  onInput=onInput
                  onFocus=onFocus
                  name="email"
                  id="email"
                  type="text"
                  label="Email"
                  ref="emailComponent"
                }}}

                {{{InputComponent
                  inputType=${ValidateType.Login}
                  onInput=onInput
                  onFocus=onFocus
                  name="login"
                  id="login"
                  type="text"
                  label="Login"
                  ref="loginComponent"
                }}}

                {{{InputComponent
                  inputType=${ValidateType.Name}
                  name="name"
                  id="name" 
                  type="text"
                  label="Name"
                  ref="nameComponent"
                }}}

                {{{InputComponent
                  inputType=${ValidateType.Phone}
                  name="phone"
                  id="phone" 
                  type="phone"
                  label="Phone"
                  ref="phoneComponent"
                }}}

                {{{InputComponent
                  inputType=${ValidateType.Password}
                  name="password"
                  id="password" 
                  type="password"
                  label="Password"
                  ref="passwordComponent"
                }}}

                {{{InputComponent
                  inputType=${ValidateType.PasswordCheck}
                  name="passwordCheck"
                  id="passwordCheck" 
                  type="password"
                  label="Password (check)"
                  ref="passwordCheckComponent"
                }}}
              </div>

              <div class="button-list">
                {{#Button class="action-button" type="submit"}}Register{{/Button}}

                {{#Button class="link link-button" type="button" onClick=onNavigateNext}}Already have an account?{{/Button}}
              </div>
            {{/Form}}
          </div>
        </main>
      {{/Layout}}
    `;
  }
}

export default withRouter(withStore(RegisterPage));
