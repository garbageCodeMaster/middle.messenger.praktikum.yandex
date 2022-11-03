export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type ChatDTO = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: UserDTO,
    time: string | Date,
    content: string,
  }
};

export const API_URL = 'https://ya-praktikum.tech/api/v2/';
export const WEBSOCKET_URL = 'wss://ya-praktikum.tech/ws/chats/';
