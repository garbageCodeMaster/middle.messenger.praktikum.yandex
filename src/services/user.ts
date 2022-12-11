import UserAPI from 'api/user';
import { DispatchStateHandler, UserDTO } from 'api/types';
import { transformUser, apiHasError } from 'utils';

type UserDataChangePayload = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar?: any,
};

type PasswordChangePayload = {
  oldpassword: string,
  newpassword: string,
};

type AvatarResponseData = {
  avatar: string;
}


export class UserService {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();

    this.editData = this.editData.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  public uploadAvatar: DispatchStateHandler<FormData> = async (dispatch, state, avatar) => {
    try {
      const response = await this.api.uploadAvatar(avatar) as AvatarResponseData;

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

  public editPassword: DispatchStateHandler<PasswordChangePayload> = async (dispatch, state, data) => {
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

  public editData: DispatchStateHandler<UserDataChangePayload> = async (dispatch, state, data) => { 
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
