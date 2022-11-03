import { ChatDTO, UserDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export const transformChat = (data: ChatDTO[]): Chat[] => {
  return data.map((chat: ChatDTO): Chat => {
    return {
      id: chat.id,
      title: chat.title,
      avatar: chat.avatar,
      unreadCount: chat.unread_count,
      lastMessage: (() => {
        if (!chat.last_message) {
          return null;
        }
        else {
          return {
            user: transformUser(chat.last_message.user),
            time: chat.last_message.time,
            content: chat.last_message.content,
          }
        }
      })()
    }
  });
};
