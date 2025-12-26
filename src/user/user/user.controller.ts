import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Res,
  // Req,
  // Res,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/hello')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return this.service.sayHello(firstName, lastName);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      tittle: 'Hello Page',
      name,
    });
  }

  // @Get('/set-cookie')
  // setCookie(@Query('name') name: string, @Res() response: Response) {
  //   response.cookie('name', name);
  //   response.status(200).send('Cookie set');
  // }

  // @Get('/get-cookie')
  // getCookie(@Req() request: Request): string {
  //   return request.cookies['name'];
  // }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return { data: 'This is a sample response' };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return { url: '/api/users/sample-response', statusCode: 302 };
  }

  // @Get('/hello')
  // async sayHello(
  //   @Query('first_name') firstName: string,
  //   @Query('last_name') lastName: string,
  // ): Promise<string> {
  //   return `Hello ${firstName} ${lastName}`;
  // }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `Get user by ID: ${id}`;
  }

  @Post()
  post(): string {
    return 'Post';
  }

  @Get('/sample')
  get(): string {
    return 'Get';
  }
}
