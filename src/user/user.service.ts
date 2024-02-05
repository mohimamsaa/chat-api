import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email: email,
    });
  }

  getUserById(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({
      _id: userId,
    });
  }

  updateSocketIdUser(userId: string, socketId: string) {
    return this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          socketId: socketId,
        },
      },
    );
  }
}
