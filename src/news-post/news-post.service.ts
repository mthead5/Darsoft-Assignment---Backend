import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsPost } from './news-post.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateNewsPostDto } from './dto/create-news-post.dto';
import { NewsEventGateway } from '../news-event/news-event.gateway';

@Injectable()
export class NewsPostService {
  constructor(
    @InjectModel(NewsPost.name) private newsPostModel: Model<NewsPost>,
    private userService: UsersService,
    private newsEventGateway: NewsEventGateway,
  ) {}

  async getAll(): Promise<NewsPost[]> {
    return this.newsPostModel.find();
  }

  async create(
    createNewsPost: CreateNewsPostDto,
    user_id: string,
  ): Promise<NewsPost> {
    const user: User = await this.userService.getUserModel(user_id);

    if (!user) return null;

    let newsPost = await this.newsPostModel.create({
      ...createNewsPost,
    });
    newsPost.owner = user;
    newsPost.save();

    newsPost = newsPost.toObject();
    delete newsPost.owner;

    this.newsEventGateway.sendNewsPost(newsPost);

    return newsPost;
  }

  async update(
    updateNewsPost: UpdateNewsPostDto,
    id: string,
  ): Promise<NewsPost> {
    const newsPost = await this.newsPostModel.findById(id);

    if (!newsPost) return null;

    console.log(updateNewsPost);
    if (updateNewsPost.title) newsPost.title = updateNewsPost.title;
    if (updateNewsPost.description)
      newsPost.description = updateNewsPost.description;

    await newsPost.save();

    this.newsEventGateway.sendNewsPost(newsPost);

    return newsPost;
  }

  async remove(id: string) {
    const newsPost = this.newsPostModel.findByIdAndDelete(id);
    if (!newsPost) return null;
    return newsPost;
  }
}
