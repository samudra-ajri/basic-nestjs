import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {
    console.info('Create User Repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    return await this.prismaService.user.create({
      data: { firstName, lastName },
    });
  }
}
