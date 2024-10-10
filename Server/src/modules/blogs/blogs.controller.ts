import {
  GetAllBlogsResponse,
  GetSingleBlogResponse,
} from './../../common/interfaces/blog.interface';
import { BlogsService } from './blogs.service';
import {
  Controller,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlogs.dto';
import { BlogSort } from '../../common/enums/blog.enum';
import { UpdateBlogDto } from './dto/updateBlog.dto';

// interfaces

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // Get a list of blogs with pagination and sorting
  @Get()
  async getBlogs(
    @Query('page') page: number = 1, // Default page to 1
    @Query('limit') limit: number = 10, // Default limit to 10
    @Query('sort') sort: BlogSort = BlogSort.recent, // Default sorting by creation date
  ): Promise<GetAllBlogsResponse> {
    try {
      return await this.blogsService.getAllBlogs(page, limit, sort);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<GetSingleBlogResponse> {
    try {
      const blog = await this.blogsService.createBlog(createBlogDto);

      return {
        data: blog,
        _links: {
          self: `/blogs/${blog.id}`,
          author: `authors/${blog.authorId}`,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          devMessage: e.message,
          clientMessage: 'Sorry ! something went wrong in server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':blogId')
  async getBlogById(
    @Param('blogId') blogId: string,
  ): Promise<GetSingleBlogResponse> {
    try {
      if (blogId === ':blogId') throw new Error('No blog id found');
      return await this.blogsService.getBlogById(blogId);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry something wrong with getting the blog',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update blog by ID
  @Put(':blogId')
  async updateBlogById(
    @Param('blogId') blogId: string,
    @Body() updateData: UpdateBlogDto,
  ): Promise<GetSingleBlogResponse> {
    try {
      if (blogId === ':blogId') throw new Error('No blog id found');
      return await this.blogsService.updateBlogById(blogId, updateData);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Failed to update the blog',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete blog by ID
  @Delete(':blogId')
  async deleteBlogById(
    @Param('blogId') blogId: string,
  ): Promise<{ message: string }> {
    try {
      if (blogId === ':blogId') throw new Error('No blog id found');
      return await this.blogsService.deleteBlogById(blogId);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Failed to delete the blog',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/author/:authorId')
  async getAuthorBlogs(
    @Param('authorId') authorId: string,
    @Query('page') page: number = 1, // Default page = 1
    @Query('limit') limit: number = 10, // Default limit = 10
  ): Promise<GetAllBlogsResponse> {
    try {
      if (authorId === ':authorId') throw new Error('No author id found');
      return await this.blogsService.getAuthorBlogs(authorId, page, limit);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while getting the author’s blogs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search')
  async getSearchedBlogs(
    @Query('page') page: number = 1,
    @Query('query') query: string = ' ',
  ): Promise<GetAllBlogsResponse> {
    try {
      if (query === ' ') throw new Error('No  query found');
      return await this.blogsService.searchBlogs(page, query);
    } catch (error) {
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage:
            'Sorry, something went wrong while getting the author’s blogs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
