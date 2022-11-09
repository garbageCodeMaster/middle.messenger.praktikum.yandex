import UserAPI from 'api/user';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import AlertCard from 'components/cards/alertCard';

type EditRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar?: any,
};

type PasswordRequestData = {
  oldpassword: string,
  newpassword: string,
};

export class UserService {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();

    this.editData = this.editData.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  public async uploadAvatar(avatar: FormData) {
    try {
      const response = await this.api.uploadAvatar(avatar);

      if (apiHasError(response)) {
        console.error(`Error: ${response.reason}`);
        window.store.setApiMessage({ apiMessage: {
          message: `Avatar wasn't uploaded. ${response.reason}`,
          type: 'error'
        }});

        return;
      } 

      window.store.setByPath('user.avatar', response.avatar);
      window.store.setApiMessage({ apiMessage: {
        message: `Avatar was uploaded successfully`,
        type: 'success' 
      }});

    } catch (error) {
      console.error(error);
    }
  }

  public async editPassword(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: PasswordRequestData,
    ): Promise<void> {
    try {
      const response = await this.api.editPassword(data);

      if (apiHasError(response)) {
        console.error(`Error: ${response.reason}`);
        window.store.setApiMessage({ apiMessage: {
          message: `Password wasn't updated. ${response.reason}`,
          type: 'error' 
        }});

        return;
      } 

      window.store.setApiMessage({ apiMessage: {
        message: `Password was changed successfully`,
        type: 'success' 
      }});
    } 
    catch (error) {
      console.error(error);
    }
  }

  public async editData(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: EditRequestData,
    ): Promise<void> { 
    try {
      const response = await this.api.editData(data);

      if (apiHasError(response)) {
        console.error(`Error: ${response.reason}`);
        return;
      } 
      
      dispatch({ user: transformUser(response as UserDTO) });
    } 
    catch (error) {
      console.error(error);
    }
  }
}

export default new UserService();
