import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'ws') return true;

    const client: Socket = context.switchToWs().getClient();
    WsJwtAuthGuard.validateToken(client);

    return true;
  }

  // This function validate a socket.io token
  // which is provided in the headers of the socket request
  // and throws an UnauthorizedException if the authorization
  // is not presented in the socket request or verifing the
  // Jwt token fail.
  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const token = authorization.split(' ')[1];

    try {
      const payload = verify(token, process.env.JWT_SECRET);
      return payload;
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
