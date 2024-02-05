import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
