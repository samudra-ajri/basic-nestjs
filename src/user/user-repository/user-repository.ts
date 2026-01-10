import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('Create User Repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    this.logger.info(
      `Saving user with firstName: ${firstName} and lastName: ${lastName}`,
    );
    return await this.prismaService.user.create({
      data: { firstName, lastName },
    });
  }
}
