import { BlogsService } from './blogs.service';
import {
  Controller,
  //   Get,
  Post,
  //   Param,
  //   Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlogs.dto';
import { Blog } from '../../common/interfaces/blog.interface';

// interfaces

interface BlogCreateResponse {
  _links: object;
  data: Blog;
}

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // Get a list of blogs with pagination and sorting
  //   @Get()
  //   async getBlogs(
  //     @Query('page') page: number = 1, // Default page to 1
  //     @Query('limit') limit: number = 10, // Default limit to 10
  //     @Query('sort') sort: string = 'createdAt', // Default sorting by creation date
  //   ): Promise<{ blogs: Blog[]; total: number }> {
  //     try {
  //       return await this.blogsService.getAllBlogs({ page, limit, sort });
  //     } catch (error) {
  //       throw new HttpException(
  //         'Error retrieving blogs',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }

  // Create a new blog

  @Post()
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BlogCreateResponse> {
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

  //   // Get a single blog by ID
  //   @Get(':blogId')
  //   async getBlogById(@Param('blogId') blogId: string): Promise<Blog> {
  //     try {
  //       const blog = await this.blogsService.getBlogById(blogId);
  //       if (!blog) {
  //         throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
  //       }
  //       return blog;
  //     } catch (error) {
  //       if (error instanceof HttpException) {
  //         throw error; // Rethrow known exceptions
  //       }
  //       throw new HttpException(
  //         'Error retrieving blog',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
}