declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export module '*.svg';
  export module '*.png';

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    apiMessage: {message: string, type: string} | null;
    user: User | null;
    chats: Chat[] | [];
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unreadCount: number,
    lastMessage: {
      user: User,
      time: string | Date,
      content: string,
    } | null,
    messages?: any,
    selected?: boolean,
  };
}

export {};
