import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewsPost } from '../news-post/news-post.schema';
import { SocketAuthMiddleware } from '../auth/ws.middleware';

export interface ServerToClientNewsEvent {
  'new-post': (payload: NewsPost) => void;
}

@WebSocketGateway({ namespace: 'news' })
export class NewsEventGateway {
  @WebSocketServer()
  server: Server<any, ServerToClientNewsEvent>;

  // When a request of socket.io is been initialzed
  // we want to authorize the user by a jwt token
  // that is provided in the headrs of the socket request
  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware());
  }

  // Here we are just emiting a post to all the users
  sendNewsPost(newsPost: NewsPost) {
    this.server.emit('new-post', newsPost);
  }
}
