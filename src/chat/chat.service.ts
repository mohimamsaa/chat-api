import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from './chat.entity';
import { CreateChatDto } from './dto/create.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<ChatDocument>) {}

  // for consume queue later
  createChat(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
  }

  // for produce queue later
  processChat(createChatDto) {
    return this.createChat(createChatDto);
  }
}
