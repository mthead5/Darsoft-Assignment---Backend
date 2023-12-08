import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

/**
 * This guard is used to make sure that user who is requesting
 * a specific proteced route is allowed by thier role.
 */
@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    if (req.user && req.user.id) {
      if (roles) {
        const user = await this.usersService.getUserModel(req.user.id);
        if (!user) return false;
        return roles.includes(user.role);
      } else return true;
    }

    return false;
  }
}
