import { PathRouter, Store, Block } from 'core';
import AuthService from 'services/auth';
import ChatService from 'services/chat';
import { withIsLoading, withStore, withRouter } from 'utils';
import { validateForm, ValidateType } from 'utils';

import './login.scss';

interface LoginProps {
  router: PathRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
};

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor(props: LoginProps) {
    super(props);
  }

  protected getStateFromProps() {
    this.setState({
      onLogin: () => {
        const validateData = [
          {
            inputType: ValidateType.Login,
            inputValue: (this.refs.loginComponent.refs.input.getContent() as HTMLInputElement).value,
          },
          {
            inputType: ValidateType.Password,
            inputValue: (this.refs.passwordComponent.refs.input.getContent() as HTMLInputElement).value,
          },
        ];

        const errorMessage = validateForm(validateData);
        this.refs.passwordComponent.refs.errorRef.setProps({ textError: errorMessage[ValidateType.Password] });
        this.refs.loginComponent.refs.errorRef.setProps({ textError: errorMessage[ValidateType.Login] });

        console.log('action/login', validateData[0].inputValue, validateData[1].inputValue);
        this.props.store.dispatch(AuthService.login, {"login": validateData[0].inputValue, "password": validateData[1].inputValue});
      },
    });
  }

  render() {
    return `
    {{#Layout}}
      <main class="home-page">
        <div class="card">
          <form class="card-form">
            <div class="card__inputs">
              <div class="form-header">
                  Log In
              </div>

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
                inputType=${ValidateType.Password}
                name="password"
                id="password" 
                type="password"
                label="Password"
                ref="passwordComponent"
              }}}

            </div>

            <div class="card__button">      
              {{#Button type="action-button" onClick=onLogin}}Login{{/Button}}
            </div> 
          </form>
        </div>
      </main>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(LoginPage)));
