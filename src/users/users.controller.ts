import {
  BadRequestException,
  Body,
  Controller,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("User Management API's")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Update a user profile' })
  @ApiBody({ type: UpdateUserProfileDto })
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUserProfile(
    @Request() req,
    @Body() updateUserProfile: UpdateUserProfileDto,
  ): Promise<User> {
    const user = await this.usersService.updateProfile(
      req.user,
      updateUserProfile,
    );
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
