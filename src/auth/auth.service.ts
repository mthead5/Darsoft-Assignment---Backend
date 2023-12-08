import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) return null;

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) return null;

    return {
      id: user._id.toString(),
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      birthday: user.birthday,
      country: user.country,
      gender: user.gender,
      phone_number: user.phone_numberp,
    };
  }

  async login(user: User) {
    // Here we are loging the user in by creating a new jwt token
    // and store the userid and the fullname of the user.
    const payload = { id: user._id.toString(), name: user.fullname };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
