import UserAPI from 'api/user';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

type EditRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
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
  }

  // public async searchUser(
  //   dispatch: Dispatch<AppState>,
  //   state: AppState,
  //   data: EditRequestData,
  //   ): Promise<void> {
  //     try {
  //       return await this.api.searchUser(data);
  //     } 
  //     catch (error) {
  //       console.error(error);
  //     }
  // }

  // public async uploadAvatar(avatar: data) {
  //   try {
  //     const response = await this.api.uploadAvatar(avatar);

  //     if (apiHasError(response)) {
  //       console.error(`Error: ${response.reason}`);
  //     } else {
  //       store.set('currentUser.avatar', response.avatar);
  //       closeModal('upload-avatar');
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  public async editPassword(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: PasswordRequestData,
    ): Promise<void> {
    try {
      const response = await this.api.editPassword(data);

      if (apiHasError(response)) {
        console.error(`Error: ${response.reason}`);
        return;
      } 
      
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
