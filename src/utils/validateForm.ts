export enum ValidateType {
    Login,
    Password,
    Email,
    Phone,
    Name,
    PasswordCheck,
}

interface ErrorData {
    [key: string]: string;
}

export interface ValidateData {
    inputType: ValidateType;
    inputValue: string;
    inputValueCompare?: string;
}

export function validateForm(validateData: ValidateData[]): ErrorData {
  const errorData = {} as ErrorData;

  validateData.forEach((input: ValidateData) => {
    let error = '';

    if (input.inputType === ValidateType.Login) {
      if (!input.inputValue) {
        error = 'Login is required';
      } 
      else if (input.inputValue.length < 4) {
        error = 'Login should contain more than 3 chars';
      }
    } 
    else if (input.inputType === ValidateType.Password) {
      if (!input.inputValue) {
        error = 'Password is required';
      } 
      else if (input.inputValue.length < 7) {
        error = 'Password should contain more than 6 chars';
      }
    } 
    else if (input.inputType === ValidateType.PasswordCheck) {
      if (input.inputValue !== input.inputValueCompare) {
        error = 'Passwords don\'t match';
      }
    } 
    else if (input.inputType === ValidateType.Email) {
      const regx = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$', 'i');

      if (!input.inputValue) {
        error = 'Email is required';
      } 
      else if (!input.inputValue.match(regx)) {
        error = 'Email has invalid format';
      }
    } 
    else if (input.inputType === ValidateType.Phone) {
      const regx = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

      if (!input.inputValue) {
        error = 'Phone number is required';
      } 
      else if (!regx.test(input.inputValue)) {
        error = 'Phone number has invalid format';
      }
    } 
    else if (input.inputType === ValidateType.Name) {
      if (!input.inputValue) {
        error = 'Name is required';
      } 
      else if (input.inputValue.length < 2) {
        error = 'Name should contain more than 2 chars';
      }
    }

    errorData[input.inputType] = error;
  });

  return errorData;
}
