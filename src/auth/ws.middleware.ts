import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from './ws-jwt-auth.guard';

// I created a type for the SocktIOMiddleware
// that will be passed using the use method in the client
// when the connection is been initizalized
export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};
// This middleware is used in the gateway to validate
// the user jwt token and authorize that uesr.
export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      WsJwtAuthGuard.validateToken(client);
      next();
    } catch (err) {
      next(err);
    }
  };
};
