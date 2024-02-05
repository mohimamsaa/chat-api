import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  providers: [ChatService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
  exports: [ChatService],
})
export class ChatModule {}
