export function getMyData(user: User) {
  const data = [
    {
      key: 'email',
      value: user.email || '',
      ref: 'emailField',
      type: 'email',
      fieldValue: 'email',
    },
    {
      key: 'login',
      value: user.login || '',
      ref: 'loginField',
      type: 'text',
      fieldValue: 'login',
    },
    {
      key: 'first_name',
      value: user.firstName || '',
      ref: 'nameField',
      type: 'text',
      fieldValue: 'name',
    },
    {
      key: 'second_name',
      value: user.secondName || '',
      ref: 'valueField',
      type: 'text',
      fieldValue: 'lastname',
    },
    {
      key: 'display_name',
      value: user.displayName || '',
      ref: 'usernameField',
      type: 'text',
      fieldValue: 'username',
    },
    {
      key: 'phone',
      value: user.phone || '',
      ref: 'phoneField',
      type: 'text',
      fieldValue: 'phone',
    },
  ];

  return data;
}
