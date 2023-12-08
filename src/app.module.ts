import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { SeedsService } from './seeds/seeds.service';
import { User, UserSchema } from './users/user.schema';
import { NewsPostModule } from './news-post/news-post.module';
import { NewsEventModule } from './news-event/news-event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AddressModule,
    AuthModule,
    NewsPostModule,
    NewsEventModule,
  ],
  providers: [SeedsService],
})
export class AppModule {}
