import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({
  timestamps: {
    currentTime: () => Date.now(),
  },
})
export class Chat {
  @Prop()
  message: string;
  @Prop()
  senderId: string;
  @Prop()
  recipientId: string;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
