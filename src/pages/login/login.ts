import { PathRouter, Store, Block } from 'core';
import AuthService from 'services/auth';
import { withStore, withRouter } from 'utils';
import { validateForm, ValidateType } from 'utils';

import './login.scss';

interface LoginProps {
  router: PathRouter;
  store: Store<AppState>;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
};

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor(props: LoginProps) {
    super(props);

    this.setProps({
      onNavigateNext: () => this.onNavigateNext(),
    });
  }

  protected getStateFromProps() {
    this.setState({
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
        ];

        const errorMessage = validateForm(validateData);
        this.refs.passwordComponent.refs.errorRef.setProps({ textError: errorMessage[ValidateType.Password] });
        this.refs.loginComponent.refs.errorRef.setProps({ textError: errorMessage[ValidateType.Login] });

        console.log('action/login', validateData[0].inputValue, validateData[1].inputValue);
        this.props.store.dispatch(AuthService.login, {"login": validateData[0].inputValue, "password": validateData[1].inputValue});
      },
    });
  }

  onNavigateNext() {
    this.props.router.go('/register');
  }

  render() {
    return `
    {{#Layout}}
      <main class="home-page">
        <div class="card card-column">
          {{#Form class="card-form" ref="form" onSubmit=onSubmit}}
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

            <div class="button-list">      
              {{#Button class="action-button" type="submit"}}Login{{/Button}}

              {{#Button class="link link-button" type="button" onClick=onNavigateNext}}Don't have an account?{{/Button}}
            </div> 
          {{/Form}}
        </div>
      </main>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(LoginPage));
