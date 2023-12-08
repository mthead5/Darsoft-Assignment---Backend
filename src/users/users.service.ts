import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateUserProfileDto } from './dto/update-profile.dto';
import { Role } from './user-roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUser: CreateUserDto): User | null {
    const { fullname, email, password } = createUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        fullname,
        email,
        password: hashedPassword,
        role: Role.User
      });

      return user;
    } catch (_) {
      return null;
    }
  }

  async updateProfile(
    user: any,
    updateUserProfile: UpdateUserProfileDto,
  ): Promise<User | null> {
    if (!mongoose.isValidObjectId(user.id)) return null;
    const userModel: User = await this.userModel.findById(user.id);
    if (!userModel) return null;
    if (updateUserProfile.birthday)
      userModel.birthday = updateUserProfile.birthday;
    if (updateUserProfile.country)
      userModel.country = updateUserProfile.country;
    if (updateUserProfile.email) userModel.email = updateUserProfile.email;
    if (updateUserProfile.fullname)
      userModel.fullname = updateUserProfile.fullname;
    if (updateUserProfile.gender) userModel.gender = updateUserProfile.gender;
    if (updateUserProfile.phone_number)
      userModel.phone_number = updateUserProfile.phone_number;
    try {
      await userModel.save();
    } catch (_) {
      return null;
    }
    delete userModel.password;
    return userModel;
  }

  async getUserModel(user_id: string): User {
    return this.userModel.findById(user_id);
  }
}
