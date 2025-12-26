import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should say hello', () => {
    const greeting = controller.sayHello('John', 'Doe');
    expect(greeting).toBe('Hello John Doe');
  });

  it('should view hello page', () => {
    const response = httpMocks.createResponse();
    controller.viewHello('Jane', response);
    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      tittle: 'Hello Page',
      name: 'Jane',
    });
  });
});
