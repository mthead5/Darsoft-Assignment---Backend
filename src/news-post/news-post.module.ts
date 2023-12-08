import { Module } from '@nestjs/common';
import { NewsPostController } from './news-post.controller';
import { NewsPostService } from './news-post.service';
import { NewsPost, NewsPostSchema } from './news-post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { NewsEventModule } from '../news-event/news-event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsPost.name, schema: NewsPostSchema },
    ]),
    UsersModule,
    NewsEventModule,
  ],
  controllers: [NewsPostController],
  providers: [NewsPostService],
})
export class NewsPostModule {}
