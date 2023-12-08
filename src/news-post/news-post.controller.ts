import {
  Controller,
  UseGuards,
  Post,
  Delete,
  Request,
  Body,
  Param,
  Put,
  Get,
  BadRequestException,
  NotFoundException,
  SetMetadata,
} from '@nestjs/common';
import { NewsPostService } from './news-post.service';
import { CreateNewsPostDto } from './dto/create-news-post.dto';
import { NewsPost } from './news-post.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { UpdateNewsPostDto } from './dto/update-news-post.dto';
import { Role } from '../users/user-roles.enum';
import { RoleAuthGuard } from '../auth/role.guard';

@ApiTags("News Post Management API's")
@Controller('news-post')
export class NewsPostController {
  constructor(private readonly newsPostService: NewsPostService) {}

  @ApiOperation({ description: 'Get all the news posts' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts(): NewsPost[] {
    return this.newsPostService.getAll();
  }

  @ApiOperation({ description: 'Add new `news post`.' })
  @ApiBody({ type: CreateNewsPostDto })
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @SetMetadata('roles', [Role.Admin])
  @Post()
  async createPost(
    @Request() req,
    @Body() createNewsPost: CreateNewsPostDto,
  ): Promise<NewsPost> {
    if (!mongoose.isValidObjectId(req.user.id)) {
      throw new BadRequestException([
        'The id of the user is not a valid ObjectID',
      ]);
    }
    const newsPost = await this.newsPostService.create(
      createNewsPost,
      req.user.id,
    );
    if (!newsPost) {
      throw new BadRequestException([
        "News Post couldn't be saved due to an invalid fields",
      ]);
    }
    return newsPost;
  }

  @ApiOperation({ description: 'Update a news post' })
  @ApiBody({ type: UpdateNewsPostDto })
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @SetMetadata('roles', [Role.Admin])
  @Put(':id')
  async updatePost(
    @Param() { id },
    @Body() updateNewsPost: UpdateNewsPostDto,
  ): NewsPost {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException([
        'The id of the post is not a valid ObjectID',
      ]);
    }

    const newsPost = await this.newsPostService.update(updateNewsPost, id);

    if (!newsPost) {
      throw new NotFoundException(["News post couldn't be found"]);
    }

    return newsPost;
  }

  @ApiOperation({ description: 'Delete a news post' })
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  async deletePost(@Param() { id }): NewsPost {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException([
        'The id of the post is not a valid ObjectID',
      ]);
    }

    const newsPost = await this.newsPostService.remove(id);

    if (!newsPost) {
      throw new NotFoundException(['News Post is not found']);
    }

    return newsPost;
  }
}
