import { IsNotEmpty, IsString } from 'class-validator';

export class ReceiveMessageDto {
  @IsString()
  @IsNotEmpty()
  recipientId: string;
  @IsString()
  @IsNotEmpty()
  senderId: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}
