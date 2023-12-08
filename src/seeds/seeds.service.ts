import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { ConfigService } from '@nestjs/config';
import { Role } from '../users/user-roles.enum';
import * as bcrypt from 'bcryptjs';

/**
 * This is a service for seeding data into the mongodb database
 */
@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async seed() {
    const adminUser = {
      fullname: 'Root User',
      email: this.configService.get('ROOT_EMAIL'),
      password: await bcrypt.hash(this.configService.get('ROOT_PASSWORD'), 10),
      role: Role.Admin,
    };

    const exists = await this.userModel.exists({ email: adminUser.email });

    if (!exists) {
      await this.userModel.create(adminUser);
    }
  }
}
