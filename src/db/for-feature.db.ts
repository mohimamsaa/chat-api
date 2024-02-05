import { Chat, ChatSchema } from 'src/chat/chat.entity';
import { User, UserSchema } from 'src/user/user.entity';

export default [
  { name: Chat.name, schema: ChatSchema },
  {
    name: User.name,
    schema: UserSchema,
  },
];
