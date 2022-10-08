import Block from 'core/Block';
import { validateForm, ValidateType } from 'utils';

import './login.scss';

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super();
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
