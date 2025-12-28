import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
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
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject() private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {}

  @Get('/connection')
  getConnectionName(): string | null {
    this.mailService.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendMail();

    return this.connection.getName();
  }

  @Get('/create')
  async create(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    return this.userRepository.save(firstName, lastName);
  }

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
