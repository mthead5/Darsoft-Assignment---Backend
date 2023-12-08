import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';

/**
 * This controlelr handle the requests for registering a user and loing as user in
 */
@ApiTags("Auth Management API's")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ description: 'Authenticate a user' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): string | null {
    // First we check if the user is not in the request object
    // or the user id is not a valid ObjectID we throw
    // an  UnauthorizedException, this is becauae the jwt token code
    // might be corrupted or manipulated and contains an invalid user.id.
    if (!req.user || !mongoose.isValidObjectId(req.user.id)) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.getUserModel(req.user.id);
    return this.authService.login(user);
  }

  @ApiOperation({ description: 'Register a user' })
  @Post('register')
  async register(
    @Body() createUser: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    // the function createUser return null if the mongoose
    // throws an error, and that error is caused only be the
    // unique property on the email field
    const user = await this.usersService.createUser(createUser);

    if (!user) {
      throw new BadRequestException(['email is already exists']);
    }
    const { token } = await this.authService.login(user);
    return {
      user,
      token,
    };
  }
}
